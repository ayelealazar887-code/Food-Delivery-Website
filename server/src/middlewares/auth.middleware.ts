import jwt from 'jsonwebtoken'
import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../types/auth'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET is not set')

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.token

  if (typeof token !== 'string') {
    return res.status(401).json({ success: false, message: 'Not Authorized' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload

    if (typeof decoded.id !== 'string') {
      return res.status(401).json({ success: false, message: 'Invalid token' })
    }

    req.userId = decoded.id
    next()
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' })
  }
}

export { authMiddleware }