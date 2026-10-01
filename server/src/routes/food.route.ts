import express from "express";
import { addFood } from "../controllers/food.controller";
import multer from "multer";

const foodRouter = express.Router();

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
})

foodRouter.post("/add", upload.single("image"), addFood);

export default foodRouter;