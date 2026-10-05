import express from 'express'
import {
  createOrder,
  listOrders,
  updateOrderStatus,
  verifyChapaPayment,
  chapaCallback,
} from '../controllers/order.controller'
import { authMiddleware } from '../middlewares/auth.middleware'

const orderRouter = express.Router()

orderRouter.get('/list', listOrders)
orderRouter.patch('/status', updateOrderStatus)

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