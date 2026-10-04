import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRouter from './routes/food.route';
import userRouter from './routes/user.route';
import cartRouter from './routes/cart.route';
import orderRouter from './routes/order.route';

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "YOUR_CLIENT_VERCEL_URL",
      "YOUR_ADMIN_VERCEL_URL",
    ],
    credentials: true,
  })
);

//DB connection

//api endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;