import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const getRecommendations=async(req,res)=>{
 //get users past orders//
 const orders=await Order.find({user:req.user._id}).populate("orderItems.product",
    "tags"
 );
 let userTags=[];

 //extract tag from purchased products//
 orders.forEach(order=>{
    order.orderItems.forEach(item=>{
      
        if(item.product&&item.product.tags){
            userTags.push(...item.product.tags);
        }
    });
 });
  //remove duplicate tags//
  userTags=[...new Set(userTags)];
  //cold start//
  if (userTags.length===0){

   const popularProducts=await Product.find().sort({soldCount:-1}).limit(5);
   return res.json({
    type:"cold-start",
    recommendations:popularProducts
   }); 

 }

 //personalized recommendations///
 const personalizedProduct=await Product.find({

    tags:{$in:userTags}
 }).sort({soldCount:-1}).limit(5);

 return res.json({
  type:"personalized",
  recommendations:personalizedProduct 

});


};
