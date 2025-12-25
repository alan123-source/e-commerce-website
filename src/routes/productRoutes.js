import express from "express";
import { CreateProduct,getProducts,getProductById } from "../controllers/productController.js";
import { protect } from "../middleware/authmiddleware.js";

const router=express.Router();

//public routes//
router.get("/",getProducts);
router.get("/:id",getProductById);

//protected route//
router.post("/",protect,CreateProduct);
export default router;