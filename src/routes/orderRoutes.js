import express from "express";
import {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    markOrderPaid,
    createOrderFromCart,
    cancelOrder,
    getOrderById
} from "../controllers/orderControllers.js";
import { protect,admin } from "../middleware/authmiddleware.js";

const router=express.Router();

//user//
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                       example: 65a123456789abcdef123456
 *                     qty:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Invalid order
 *       401:
 *         description: Unauthorized
 */

router.post("/",protect,createOrder);
/**
 * @swagger
 * /api/orders/myorders:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */

router.get("/my-orders",protect,getMyOrders);
router.get("/",protect,admin,getAllOrders);
router.get("/:id",protect,getOrderById);
router.put("/pay",protect,markOrderPaid);
router.post("/from-cart",protect,createOrderFromCart);
router.put("/:id/cancel",protect,cancelOrder);

//admin//

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders (Admin)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all orders
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin access required
 */


router.put("/:id/status",protect,admin,updateOrderStatus);

export default router;
