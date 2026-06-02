import User from "../models/userModel.js";

export const addRecentlyViewed=async(req,res)=>{

    try{
        const user=await User.findById(
            req.user._id
        );

        const productId=req.params.productId;
        user.recentlyViewed=user.recentlyViewed.filter(
            (id)=>id.toString()!==productId
        );

        user.recentlyViewed.unshift(productId);
        user.recentlyViewed.slice(0,10);
        await user.save();
        return res.json({
            success:true
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"server error"
        })
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