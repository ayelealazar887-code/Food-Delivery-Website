import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import type { Request, Response } from 'express'
import prisma from '../config/prisma'

const createToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string
  )
}

// Register
const registerUser = async (
  req: Request,
  res: Response
) => {
  const { name, email, password } = req.body

  try {
    const exists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      })
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email',
      })
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a password with at least 8 characters',
      })
    }

    const salt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    )

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    const token = createToken(newUser.id)

    return res.status(201).json({
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Error creating user',
    })
  }
}

// Login
const loginUser = async (
  req: Request,
  res: Response
) => {
  const { email, password } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User does not exist',
      })
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password',
      })
    }

    const token = createToken(user.id)

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Error logging in',
    })
  }
}

export {
  loginUser,
  registerUser,
}