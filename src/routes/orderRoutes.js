import express from "express";
import {
    createOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    markOrderPaid,
    createOrderFromCart,
    cancelOrder
} from "../controllers/orderControllers.js";
import { protect,admin } from "../middleware/authmiddleware.js";

const router=express.Router();

//user//
router.post("/",protect,createOrder);
router.get("/myorders",protect,getMyOrders);
router.put("/pay",protect,markOrderPaid);
router.post("/checkout",protect,createOrderFromCart);
router.put("/:id/cancel",protect,cancelOrder);

//admin//
router.get("/",protect,admin,getAllOrders);
router.put("/:id/status",protect,admin,updateOrderStatus);
export default router;
