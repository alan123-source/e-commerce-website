import express from "express";
import {validateCoupon,createCoupon,getAllCoupons,toggleCouponStatus} from "../controllers/couponController.js";
import {protect,admin} from "../middleware/authmiddleware.js";

const router=express.Router();


router.post("/",protect,admin,createCoupon);
router.post("/validate",validateCoupon);
router.get("/",protect,admin,getAllCoupons);
router.patch("/:id/toggle",protect,admin,toggleCouponStatus);

export default router;