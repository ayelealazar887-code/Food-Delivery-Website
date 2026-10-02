import express from "express";
import { addFood, removeFood, updateFood } from "../controllers/food.controller";
import { listFood } from "../controllers/food.controller";
import multer from "multer";

const foodRouter = express.Router();

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
})

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", removeFood);
foodRouter.put("/update", updateFood);

export default foodRouter;