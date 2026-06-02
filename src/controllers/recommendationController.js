import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import mongoose from "mongoose";


export const getRecommendations=async(req,res)=>{

   
try{

   const userId=req.user._id;
 //get users past orders//
 const orders=await Order.find({user:userId}).populate("orderItems.product",
    "tags category"
 );
 let userTags=[];
 let purchasedProductIds=[];
 let userCategories=[];
 //extract tag from purchased products//
 orders.forEach((order)=>{
    order.orderItems.forEach((item)=>{
      
        if(item.product){
       
         purchasedProductIds.push(item.product._id.toString());
        
         if(item.product.tags){
            userTags.push(...item.product.tags);

         }
         if (item.product.category){
            userCategories.push(item.product.category.toLowerCase())
         }
      }

    });
 });
  //remove duplicate tags//
  userTags=[...new Set(userTags)];
  userCategories=[...new Set(userCategories)];
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
 const recommendations = await Product.aggregate([
  
  {
    $match: {
      tags: { $in: userTags },
      _id: {
        $nin: purchasedProductIds.map(
          (id) => new mongoose.Types.ObjectId(id)
        )
      }
    }
  },

  {
    $addFields: {
      matchedTagsCount: {
        $size: {
          $setIntersection: ["$tags", userTags]
        }
      },
      categoryBoost:{
         $cond:[
            {$in:[{$toLower:"$category"},userCategories]},
            5,
            0
         ]
      }
    }
  },
  {
      $addFields:{
         recommendationScore:{
            $add:[
               "$matchedTagsCount",
               "$categoryBoost"
            ]
         }
      }
  },

  {
    $sort: {
      recommendationScore: -1,
      soldCount: -1
    }
  },

  {
    $limit: 5
  }
]);

console.log("user tags:",userTags);
console.log("user categories",userCategories);
console.log("recommendations",recommendations.map((p)=>({
   name:p.name,
   category:p.category,
   matchedTagsCount:p.matchedTagsCount,
   categoryBoost:p.categoryBoost,
   recommendationScore:p.recommendationScore
})))

return res.json({
   success:true,
   type:"personalized",
   data:recommendations
});

}catch(error){
   res.status(500).json({
      message:"server error"
   });
}
   


};
