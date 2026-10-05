import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import foodRouter from './routes/food.route'
import userRouter from './routes/user.route'
import cartRouter from './routes/cart.route'
import orderRouter from './routes/order.route'

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL?.replace(/\/$/, ''),
  process.env.ADMIN_URL?.replace(/\/$/, ''),
].filter((o): o is string => Boolean(o))

app.use(express.json())

app.use(
  cors({
    origin: (origin, callback) => {
      // allow non-browser requests (no Origin) and whitelisted origins
      callback(null, !origin || allowedOrigins.includes(origin))
    },
    allowedHeaders: ['Content-Type', 'token'],
  })
)

app.use('/api/food', foodRouter)
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
  res.send('API is running...')
})

export default app