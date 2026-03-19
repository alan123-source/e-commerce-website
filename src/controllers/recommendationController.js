import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const getRecommendations=async(req,res)=>{
   const userId=req.user._id;
 //get users past orders//
 const orders=await Order.find({user:userId}).populate("orderItems.product",
    "tags"
 );
 let userTags=[];
 let purchasedProductIds=[];
 //extract tag from purchased products//
 orders.forEach((order)=>{
    order.orderItems.forEach((item)=>{
      
        if(item.product){
       
         purchasedProductIds.push(item.product._id.toString());
        
         if(item.product.tags){
            userTags.push(...item.product.tags);
         }
      }

    });
 });
  //remove duplicate tags//
  userTags=[...new Set(userTags)];
  //cold start//
  if (userTags.length===0){

   const popularProducts=await Product.find().sort({soldCount:-1}).limit(5);
   return res.json({
    success:true,
    type:"cold-start",
    data:popularProducts
   }); 

 }

 //personalized recommendations///
 const recommendations=await Product.find({

    tags:{$in:userTags},
    _id:{$nin:purchasedProductIds}
 }).sort({soldCount:-1}).limit(5);

 return res.json({
   success:true,
  type:"personalized",
  data:recommendations 

});


};
