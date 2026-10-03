import jwt from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.headers

  if (!token) {
    return res.json({
      success: false,
      message: 'Not Authorized user',
    })
  }

  try {
    const token_decode = jwt.verify(
      token as string,
      process.env.JWT_SECRET as string
    ) as jwt.JwtPayload

    req.body.userId = token_decode.id

    next()
  } catch (error) {
    return res.json({
      success: false,
      message: 'Invalid token',
    })
  }
}

export {
  authMiddleware,
}