import Coupon from "../models/couponModel.js";

export const validateCoupon=async(req,res)=>{
    try{

        const {code}=req.body;

        const coupon=await Coupon.findOne({
            code:code.toUpperCase()
        });

        if(!coupon){
            return res.status(404).json({
                valid:false,
                message:"Coupon not found"
            });
        }

        if(!coupon.isActive){
            return res.status(400).json({
                valid:false,
                message:"Coupon inactive"
            });
        }

        if(coupon.expiryDate <new Date()){
            return res.status(400).json({
                valid:false,
                message:"Coupon Expired"
            });
        }
        return res.json({
            valid:true,
            code:coupon.code,
            discountPercentage:coupon.discountPercentage
        }

        );
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        })
    }
};

export const createCoupon=async(req,res)=>{
    try{

        const {code,discountPercentage,expiryDate}=req.body;
        const existingCoupon=await Coupon.findOne({
            code:code.toUpperCase()
        });

        if(existingCoupon){
            return res.status(400).json({
                message:"coupon already exists"
            });
        }

        const coupon=await Coupon.create({
            code:code.toUpperCase(),
            discountPercentage,
            expiryDate
        });

        return res.status(201).json(coupon);

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"server error"
        })
    }
}

export const getAllCoupons=async(req,res)=>{

    try{

        const coupons=await Coupon.find().sort({createdAt:-1})
        return res.json(coupons);

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server error"
        })
    }

};

export const toggleCouponStatus=async(req,res)=>{
    try{

        const coupon=await Coupon.findById(
            req.params.id
        );

        if(!coupon){
            return res.status(404).json({
                message:"Coupin Not found"
            });

        }
            coupon.isActive=!coupon.isActive;
            await coupon.save();
           return res.json(coupon);

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        });

    }
};