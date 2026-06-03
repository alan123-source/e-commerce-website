import mongoose from "mongoose";
import User from "../models/userModel.js";

export const addRecentlyViewed = async(req,res)=>{

   try{

      const productId = new mongoose.Types.ObjectId(
   req.params.productId
);

      await User.findByIdAndUpdate(
         req.user._id,
         {
            $pull:{
               recentlyViewed:productId
            }
         }
      );

      await User.findByIdAndUpdate(
         req.user._id,
         {
            $push:{
               recentlyViewed:{
                  $each:[productId],
                  $position:0,
                  $slice:3
               }
            }
         }
      );

      const updatedUser = await User.findById(
         req.user._id
      );

      updatedUser.recentlyViewed = [
         ...new Set(
            updatedUser.recentlyViewed.map(
               (id)=>id.toString()
            )
         )
      ];

      await updatedUser.save();

      return res.json({
         success:true
      });

   }catch(error){

      console.log(error);

      return res.status(500).json({
         message:"server error"
      });

   }

}

export const getRecentlyViewed=async(req,res)=>{
 
    try{
        const user=await User.findById(
            req.user._id
        ).populate("recentlyViewed");
        return res.json({
            success:true,
            recentlyViewed:user.recentlyViewed
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Server error"
        });
    }

}