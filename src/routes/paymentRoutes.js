import express from "express";
import { createPaymentIntent,refundPayment } from "../controllers/paymentController.js";
import {protect,admin} from "../middleware/authmiddleware.js";
const router=express.Router();
router.post("/create",protect,createPaymentIntent);
router.post("/refund",protect,admin,refundPayment);
export default router;
