import express from "express";
import {
    createOrder,
    getMyOrders,
    getAllOrders
} from "../controllers/orderControllers.js";
import { protect,admin } from "../middleware/authmiddleware.js";

const router=express.Router();

//user//
router.post("/",protect,createOrder);
router.get("/myorders",protect,getMyOrders);

//admin//
router.get("/",protect,admin,getAllOrders);
export default router;
