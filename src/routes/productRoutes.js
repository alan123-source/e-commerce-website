import express from "express";
import {body} from "express-validator";
import validateRequest from "../middleware/validateRequest.js";
import { CreateProduct,getProducts,getProductById,updateProduct,deleteProduct} from "../controllers/productController.js";
import { protect,admin} from "../middleware/authmiddleware.js";

const router=express.Router();

//public routes//
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 65a123456789abcdef123456
 *                   name:
 *                     type: string
 *                     example: Laptop
 *                   price:
 *                     type: number
 *                     example: 45000
 *                   description:
 *                     type: string
 *                     example: High performance laptop
 *                   stock:
 *                     type: number
 *                     example: 20
 */
router.get("/",getProducts);
router.get("/:id",getProductById);

//protected route admin only//
router.post("/",protect,admin,
    [
        body("name").notEmpty().withMessage("product name required"),
        body("price").isFloat({gt:0}).withMessage("price must be greater than 0"),
        body("stock").isInt({min:0}).withMessage("stock must be non negative"),
    ],validateRequest,
     CreateProduct);

router.put("/:id",protect,admin,updateProduct);
router.delete("/:id",protect,admin,deleteProduct);

export default router;

/*the flow is from protect->admin->controler
no token blocked by protect token but not admin 
blocked by admin
admin allowd to create product*/
