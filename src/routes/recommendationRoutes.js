import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";
import {protect} from "../middleware/authmiddleware.js";

const router=express.Router();
/**
 * @swagger
 * /api/recommendations:
 *   get:
 *     summary: Get personalized product recommendations
 *     description: Returns personalized recommendations based on user purchase history and product tags. Falls back to popular products for new users.
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of recommended products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 type:
 *                   type: string
 *                   example: personalized
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       401:
 *         description: Unauthorized
 */
router.get("/",protect,getRecommendations);
export default router;