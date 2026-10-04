import type { Request, Response } from "express";
import prisma from "../config/prisma";
import crypto from "crypto";

const CHAPA_URL = "https://api.chapa.co/v1/transaction";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req;

    const { items, amount, address } = req.body;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authorized",
      });
    }

    if (!items || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Items, amount and address are required",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const txRef = `food-${crypto.randomUUID()}`;

    const order = await prisma.order.create({
      data: {
        userId,
        items,
        amount: Number(amount),
        address,
        txRef,
      },
    });

    console.log(
      "CHAPA KEY:",
      process.env.CHAPA_SECRET_KEY
        ? `${process.env.CHAPA_SECRET_KEY.slice(0, 20)}...`
        : "MISSING",
    );

    const chapaResponse = await fetch(`${CHAPA_URL}/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount.toString(),
        currency: "ETB",
        email: user.email,
        first_name: user.name,
        tx_ref: txRef,
        callback_url: `${process.env.BACKEND_URL}/api/order/chapa/callback`,
        return_url: `${process.env.FRONTEND_URL}/payment-success`,
        customization: {
          title: "Food Ordering",
          description: "Food order payment",
        },
      }),
    });

    const chapaData = await chapaResponse.json();

    console.log("CHAPA RESPONSE:", chapaData);

    if (!chapaResponse.ok || chapaData.status !== "success") {
      await prisma.order.delete({
        where: {
          id: order.id,
        },
      });

      return res.status(400).json({
        success: false,
        message: "Unable to initialize Chapa payment",
        error: chapaData,
      });
    }

    return res.status(201).json({
      success: true,
      message: "Order created",
      orderId: order.id,
      txRef,
      checkoutUrl: chapaData.data.checkout_url,
    });
  } catch (error) {
    console.error("CREATE ORDER ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating order",
    });
  }
};

//payment contoller

export const verifyChapaPayment = async (req: Request, res: Response) => {
  try {
    const { txRef } = req.params;

    if (typeof txRef !== "string" || !txRef) {
      return res.status(400).json({
        success: false,
        message: "Transaction reference is required",
      });
    }

    const order = await prisma.order.findUnique({
      where: {
        txRef,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const response = await fetch(`${CHAPA_URL}/verify/${txRef}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    console.log("CHAPA VERIFY:", data);

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        message: "Unable to verify payment",
        data,
      });
    }

    if (data.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment was not successful",
        data,
      });
    }

    const transaction = data.data;

    if (transaction.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment is not successful",
        data: transaction,
      });
    }

    if (Number(transaction.amount) !== order.amount) {
      return res.status(400).json({
        success: false,
        message: "Payment amount does not match order amount",
      });
    }

    if (order.payment) {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
        order,
      });
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        payment: true,
        status: "PROCESSING",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("VERIFY CHAPA PAYMENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
    });
  }
};

//tsx

export const chapaCallback = async (req: Request, res: Response) => {
  try {
    const { trx_ref } = req.query;

    if (!trx_ref || typeof trx_ref !== "string") {
      return res.status(400).json({
        success: false,
        message: "Transaction reference is missing",
      });
    }

    const response = await fetch(`${CHAPA_URL}/verify/${trx_ref}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
      },
    });

    const data = await response.json();

    console.log("CHAPA CALLBACK VERIFY:", data);

    if (
      response.ok &&
      data.status === "success" &&
      data.data?.status === "success"
    ) {
      const order = await prisma.order.findUnique({
        where: {
          txRef: trx_ref,
        },
      });

      if (order && !order.payment) {
        if (Number(data.data.amount) === order.amount) {
          await prisma.order.update({
            where: {
              id: order.id,
            },
            data: {
              payment: true,
              status: "PROCESSING",
            },
          });
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: "Callback received",
    });
  } catch (error) {
    console.error("CHAPA CALLBACK ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Callback processing failed",
    });
  }
};
