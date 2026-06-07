import express from "express";
import { getAnalytics,getLowStockProducts} from "../controllers/adminController.js";
import {protect,admin} from "../middleware/authmiddleware.js";
const router=express.Router();
/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     summary: Get admin analytics (users, orders, revenue, top products)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers:
 *                       type: number
 *                       example: 150
 *                     totalOrders:
 *                       type: number
 *                       example: 45
 *                     totalRevenue:
 *                       type: number
 *                       example: 120000
 */
router.get("/analytics",protect,admin,getAnalytics);
export default router;

router.get("/low-stock",protect,admin,getLowStockProducts);
