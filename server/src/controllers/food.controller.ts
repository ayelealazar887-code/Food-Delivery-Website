import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import prisma from "../config/prisma";
import fs from "fs";

const addFood = async (req: Request, res: Response) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    const { name, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    console.log("Uploading image to Cloudinary...");

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {},
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );

      uploadStream.end(req.file!.buffer);
    });

    console.log("Cloudinary result:", result);

    console.log("Creating food in database...");

    const food = await prisma.food.create({
      data: {
        name,
        description,
        price: Number(price),
        image: result.secure_url,
        category,
      },
    });

    console.log("Food created:", food);

    return res.status(201).json({
      success: true,
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    console.error("ADD FOOD ERROR:");
    console.dir(error, { depth: null });

    return res.status(500).json({
      message: "Error adding food",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export { addFood };
