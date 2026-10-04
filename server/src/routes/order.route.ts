import express from 'express'
import {
  createOrder,
  verifyChapaPayment,
  chapaCallback,
} from '../controllers/order.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const orderRouter = express.Router()

orderRouter.post(
  '/create',
  authMiddleware,
  createOrder
)

orderRouter.get(
  '/verify/:txRef',
  verifyChapaPayment
)

orderRouter.get(
  '/chapa/callback',
  chapaCallback
)

export default orderRouter