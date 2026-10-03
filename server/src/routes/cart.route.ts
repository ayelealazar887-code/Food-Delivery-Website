import express from 'express';
import { addCart, getCart, removeCart } from '../controllers/cart.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleware, addCart);
cartRouter.post('/remove',authMiddleware, removeCart);
cartRouter.post('/get',authMiddleware, getCart);

export default cartRouter