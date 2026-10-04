import type { Request, Response } from 'express'
import prisma from '../config/prisma'

type CartData = Record<string, number>

// Add item to user's cart
const addCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req
    const { itemId } = req.body

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authorized' })
    }

    if (typeof itemId !== 'string' || !itemId) {
      return res.status(400).json({ success: false, message: 'Invalid item ID' })
    }

    // Rename `food` to whatever your item model is called
    const item = await prisma.food.findUnique({
      where: { id: itemId },
      select: { id: true },
    })
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { cartData: true },
    })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const cartData = (user.cartData ?? {}) as CartData
    cartData[itemId] = (cartData[itemId] || 0) + 1

    await prisma.user.update({
      where: { id: userId },
      data: { cartData },
    })

    return res.status(200).json({ success: true, message: 'Item added to cart', cartData })
  } catch (error) {
    console.error('ADD CART ERROR:', error)
    return res.status(500).json({ success: false, message: 'Error adding item to cart' })
  }
}

// Remove item from user's cart
const removeCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req
    const { itemId } = req.body

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authorized' })
    }

    if (typeof itemId !== 'string' || !itemId) {
      return res.status(400).json({ success: false, message: 'Invalid item ID' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { cartData: true },
    })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    const cartData = (user.cartData ?? {}) as CartData

    if (cartData[itemId]) {
      cartData[itemId] -= 1
      if (cartData[itemId] <= 0) {
        delete cartData[itemId]
      }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { cartData },
    })

    return res.status(200).json({ success: true, message: 'Item removed from cart', cartData })
  } catch (error) {
    console.error('REMOVE CART ERROR:', error)
    return res.status(500).json({ success: false, message: 'Error removing item from cart' })
  }
}

// Get user's cart
const getCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req

    if (!userId) {
      return res.status(401).json({ success: false, message: 'User not authorized' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { cartData: true },
    })
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }

    return res.status(200).json({ success: true, cartData: user.cartData ?? {} })
  } catch (error) {
    console.error('GET CART ERROR:', error)
    return res.status(500).json({ success: false, message: 'Error getting cart' })
  }
}

export { addCart, removeCart, getCart }