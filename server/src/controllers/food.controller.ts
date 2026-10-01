import type { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import prisma from "../config/prisma";
import fs from "fs";

const addFood = async (req: Request, res: Response) => {
    try {
        const { name, description, price, category } = req.body;

        if(!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        const result = await new Promise<any>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "food_images" },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(req.file!.buffer);
        });

        const newFood = await prisma.food.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                image: result.secure_url, 
                category,
            },
        });

        return res.status(201).json({
        success: true,
        message: 'Food added successfully',
        newFood,
    })
    } catch (error) {
        res.status(500).json({ message: "Error adding food" });
    }
}


export { addFood };