import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import foodRouter from './routes/food.route';

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//DB connection

//api endpoints
app.use('/api/food', foodRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;