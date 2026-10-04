import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

const authMiddleware = (
  req: Request,
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