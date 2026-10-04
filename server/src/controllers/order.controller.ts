import type { Request, Response } from 'express'
import type { AuthRequest } from '../types/auth'
import prisma from '../config/prisma'
import crypto from 'crypto'

const CHAPA_URL = 'https://api.chapa.co/v1/transaction'

interface ChapaVerifyResponse {
  status: string
  data?: {
    status: string
    amount: string | number
  }
}

interface ChapaInitResponse {
  status: string
  data: {
    checkout_url: string
  }
}

const verifyWithChapa = async (txRef: string) => {
  const response = await fetch(`${CHAPA_URL}/verify/${encodeURIComponent(txRef)}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}` },
  })
  const data = (await response.json()) as ChapaVerifyResponse
  const paid =
    response.ok && data.status === 'success' && data.data?.status === 'success'
  return { paid, data }
}

// Only flips payment false -> true once, even if callback and verify race
const markOrderPaid = async (orderId: string) => {
  const result = await prisma.order.updateMany({
    where: { id: orderId, payment: false },
    data: { payment: true, status: 'PROCESSING' },
  })
  return result.count > 0
}

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req
    const { items, amount, address } = req.body

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authorized' })
    }

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: 'Items, amount and address are required',
      })
    }

    const numericAmount = Number(amount)
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ success: false, message: 'Invalid amount' })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const txRef = `food-${crypto.randomUUID()}`

    const order = await prisma.order.create({
      data: { userId, items, amount: numericAmount, address, txRef },
    })

    const chapaResponse = await fetch(`${CHAPA_URL}/initialize`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: numericAmount.toString(),
        currency: 'ETB',
        email: user.email,
        first_name: user.name,
        tx_ref: txRef,
        callback_url: `${process.env.BACKEND_URL}/api/order/chapa/callback`,
        return_url: `${process.env.FRONTEND_URL}/payment-success`,
        customization: {
          title: 'Food Ordering',
          description: 'Food order payment',
        },
      }),
    })

    const chapaData = (await chapaResponse.json()) as ChapaInitResponse

    if (!chapaResponse.ok || chapaData.status !== 'success') {
      await prisma.order.delete({ where: { id: order.id } })
      return res.status(400).json({
        success: false,
        message: 'Unable to initialize Chapa payment',
      })
    }

    return res.status(201).json({
      success: true,
      message: 'Order created',
      orderId: order.id,
      txRef,
      checkoutUrl: chapaData.data.checkout_url,
    })
  } catch (error) {
    console.error('CREATE ORDER ERROR:', error)
    return res.status(500).json({ success: false, message: 'Error creating order' })
  }
}

export const verifyChapaPayment = async (req: Request, res: Response) => {
  try {
    const { txRef } = req.params

    if (typeof txRef !== 'string' || !txRef) {
      return res.status(400).json({
        success: false,
        message: 'Transaction reference is required',
      })
    }

    const order = await prisma.order.findUnique({ where: { txRef } })
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' })
    }

    if (order.payment) {
      return res.status(200).json({
        success: true,
        message: 'Payment already verified',
        order,
      })
    }

    const { paid, data } = await verifyWithChapa(txRef)

    if (!paid) {
      return res.status(400).json({ success: false, message: 'Payment was not successful' })
    }

    if (Number(data.data?.amount) !== order.amount) {
      return res.status(400).json({
        success: false,
        message: 'Payment amount does not match order amount',
      })
    }

    await markOrderPaid(order.id)
    const updatedOrder = await prisma.order.findUnique({ where: { id: order.id } })

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      order: updatedOrder,
    })
  } catch (error) {
    console.error('VERIFY CHAPA PAYMENT ERROR:', error)
    return res.status(500).json({ success: false, message: 'Error verifying payment' })
  }
}

export const chapaCallback = async (req: Request, res: Response) => {
  try {
    const { trx_ref } = req.query

    if (!trx_ref || typeof trx_ref !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Transaction reference is missing',
      })
    }

    const order = await prisma.order.findUnique({ where: { txRef: trx_ref } })

    if (order && !order.payment) {
      const { paid, data } = await verifyWithChapa(trx_ref)
      if (paid && Number(data.data?.amount) === order.amount) {
        await markOrderPaid(order.id)
      }
    }

    return res.status(200).json({ success: true, message: 'Callback received' })
  } catch (error) {
    console.error('CHAPA CALLBACK ERROR:', error)
    return res.status(500).json({ success: false, message: 'Callback processing failed' })
  }
}