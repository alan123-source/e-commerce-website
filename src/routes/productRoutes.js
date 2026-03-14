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
 *                 $ref:'#/components/schemas/Product'
 */
router.get("/",getProducts);
router.get("/:id",getProductById);

//protected route admin only//

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */
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
