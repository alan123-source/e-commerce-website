import express from "express";
import { createPaymentIntent } from "../controllers/paymentController.js";
import {protect} from "../middleware/authmiddleware.js";
const router=express.Router();
router.post("/create",protect,createPaymentIntent);
export default router;