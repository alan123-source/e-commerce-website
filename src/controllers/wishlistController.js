import mongoose from "mongoose";
import User from "../models/userModel.js";

export const toggleWishlist=async(req,res)=>{
    try{

        const user=await User.findById(req.user._id);
        const productId=req.params.productId;
        const alreadyExist=user.wishlist.includes(productId);
        if (alreadyExist){
            user.wishlist=user.wishlist.filter((id)=>
              id.toString()!==productId
            );
        }else{
            user.wishlist.push(productId);
        }
        await user.save();
        return res.json({
            sucess:true,
            wishlist:user.wishlist
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            messsage:"Server Error"
        });
    }
};

export const getWishlist=async(req,res)=>{
    try{

        const user=await User.findById(
            req.user._id
        ).populate("wishlist");
        return res.json({
            sucess:"true",
            wishlist:user.wishlist
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server Error"
        });
    }
};