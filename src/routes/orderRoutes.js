import express from "express";
import {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus
} from "../controllers/orderControllers.js";
import { protect,admin } from "../middleware/authmiddleware.js";

const router=express.Router();

//user//
router.post("/",protect,createOrder);
router.get("/myorders",protect,getMyOrders);

//admin//
router.get("/",protect,admin,getAllOrders);
router.put("/:id/status",protect,admin,updateOrderStatus);
export default router;
