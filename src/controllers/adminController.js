import Order from "../models/orderModel.js";
import User from "../models/userModel.js";

export const getDashboardStats=async(req,res)=>{
    const totalOrders=await Order.countDocuments();
    const totalUsers=await User.countDocuments();

    const totalRevenue=await Order.aggregate([
        
        {$match:{isPaid:true}},
    {$group:{_id:null,total:{$sum:"$totalPrice"}}}
]);

res.json({
  
    totalOrders,
    totalUsers,
    totalRevenue:totalRevenue[0]?.total||0

});
};