import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import prisma from "../config/prisma";

//Add food
const addFood = async (req: Request, res: Response) => {
  try {
    console.log('BODY:', req.body)
    console.log('FILE:', req.file)

    const { name, description, price, category } = req.body

    if (!req.file) {
      return res.status(400).json({
        message: 'Image file is required',
      })
    }

    console.log('Uploading image to Cloudinary...')

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'food-ordering-api',
        },
        (error, result) => {
          if (error) {
            reject(error)
          } else {
            resolve(result)
          }
        }
      )

      uploadStream.end(req.file!.buffer)
    })

    console.log('Cloudinary result:', result)

    console.log('Creating food in database...')

    const food = await prisma.food.create({
      data: {
        name,
        description,
        price: Number(price),
        image: result.secure_url,
        category,
      },
    })

    console.log('Food created:', food)

    return res.status(201).json({
      success: true,
      message: 'Food added successfully',
      food,
    })
  } catch (error) {
    console.error('ADD FOOD ERROR:', error)

    return res.status(500).json({
      message: 'Error adding food',
    })
  }
}


//list Foods
const listFood = async (
  req: Request,
  res: Response
) => {
  try {
    const foods = await prisma.food.findMany({})
    res.status(200).json({
      success: true,
      data: foods
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch."
    })
  }
}

//Remove foods
const removeFood = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.body

    await prisma.food.delete({
      where: {
        id
      }
    })

    return res.json({
      success: true,
      message: "Food removed successfully"
    })
  } catch (error) {
    console.log(error)

    return res.status(500).json({
      success: false,
      message: "Failed to remove food"
    })
  }
}

//update foods
const updateFood = async (
  req: Request,
  res: Response
) => {

}


export {
  addFood,
  listFood,
  removeFood,
  updateFood
};