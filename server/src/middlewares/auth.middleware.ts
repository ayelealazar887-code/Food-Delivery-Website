import jwt from 'jsonwebtoken'
import type { Response, NextFunction } from 'express'
import type { AuthRequest } from '../types/auth'

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not Authorized',
    })
  }

  try {
    const token_decode = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload

    req.userId = token_decode.id as string

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token',
    })
  }
}

export { authMiddleware }