import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";

export const getAnalytics=async(req,res)=>{

    try{

         const totalOrders=await Order.countDocuments();
    const totalUsers=await User.countDocuments();
    const totalProducts=await Product.countDocuments();
    const revenueData=await Order.aggregate([
        
            {
                $match:{
                    isPaid:true
                }
            },
            {
            $group:{
                _id:null,
                totalRevenue:{$sum:"$totalPrice"}
            }
        }
    ]);
    const totalRevenue=revenueData[0]?.totalRevenue||0;
    const topProduct=await Product.find().sort({soldCount:-1}).limit(5);
    
    res.json({
        success:true,
        data:{
            totalUsers,
            totalOrders,
            totalProducts,
            totalRevenue,
            topProduct
        }
    });

    }catch(error){
        console.log(error);
    }
   
};