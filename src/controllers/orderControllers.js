import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";
import { successResponse } from "../utils/apiResponse.js";

//create order//
export const createOrder=async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();

    try{
    
    const {orderItems}=req.body;
    if(!orderItems||orderItems.length===0){
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({message:"No order items"});
    }
    let totalPrice=0;
    const processedItems=[];
    for (const item of orderItems){
        const product=await Product.findById(item.product);
        if(!product){
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({
                message:"Product not found"
            });
        }

        if(product.stock<item.qty){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({
           
                message:"insufficient stock"
            });
        }
        const itemTotal=product.price*item.qty;
        totalPrice+=itemTotal;
        processedItems.push({
            product:product._id,
            qty:item.qty,
            price:product.price
        });
        product.stock-=item.qty;
        product.soldCount+=item.qty;
        await product.save({session});
    }

    const order=await Order.create(
    [
        {
        user:req.user._id,
        orderItems:processedItems,
        totalPrice
  }
],{session});

  await session.commitTransaction();
  session.endSession();
  
  res.status(201).json(order[0]);
} catch(error){
     await session.abortTransaction();
     session.endSession();

     console.log("Transactoion error",error);
     res.status(500).json({
        message:"server error while creating order"
     });

    }
};

//get user orders//

export const getMyOrders=async(req,res)=>{
   const orders=await Order.find({user:req.user._id});
  successResponse(res,orders,201);
   res.json(orders)
};

//admin get all orders//
export const getAllOrders=async(req,res)=>{
    const orders=await Order.find().populate("user","name email");
    //populate function replaces id get from
    //  the ordercollection with details from
    //  the user colection only name and email
    res.json(orders);
};

//Admin only update order status//
export const updateOrderStatus=async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if (!order){
       return res.status(404).json({message:"oredr not found"});
    }

    const {status}=req.body;
    if(!["SHIPPED","DELIVERED"].includes(status)){
        return res.status(404).json({message:"invalid status"});
    }
    order.status=status;
    if (status=="SHIPPED"){
      order.shippedAt=Date.now();
    }

    if (status=="DELIVERED"){
        order.deliveredAt=Date.now();
    }
    const updateOrder=await order.save();
    res.json(updateOrder);

};

export const markOrderPaid=async(req,res)=>{
    const {orderId,paymentIntentId}=req.body;
    
    if (!orderId||!paymentIntentId){
      return res.status(400).json({message:"Order ID and payment ID required"});   
    }
    const order=await Order.findById(orderId);
    if(!order){
      return res.status(404).json({message:"order not found"});

    }
    order.isPaid=true;
    for (const item of order.orderItems){
        const product=await Product.findById(item.product);
        product.soldCount+=item.qty;
        await product.save();
    }
    order.paidAt=Date.now();
    order.paymentIntentId=paymentIntentId;

    const updateOrder=await order.save();
    res.json(updateOrder);


};

export const createOrderFromCart=async(req,res)=>{
   const cart=await Cart.findOne({user:req.user._id}).populate(
    "items.product",
    "price"
   );

   if(!cart||cart.items.length===0)
     {
        return res.status(400).json({message:"Cart is empty"});
     }

     let orderItems=[];
     let totalPrice=0;

     //stock check//
     for (const item of cart.items){
      if(item.qty>item.product.stock){
        return res.status(400).json({message:`insufficient stock for ${item.product._id}`});
      }

     }
      //create order items and reduce stock//
     for (const item of cart.items){
        const product=await Product.findById(item.product._id);
        product.stock-=item.qty;
        await product.save();
        totalPrice+=product.price*item.qty;
        orderItems.push({
            product:item.product._id,
            qty:item.qty,
            price:product.price
        });
     }

     const order=await Order.create({
        user:req.user._id,
        orderItems,
        totalPrice,
        status:"PLACED"
     });

     //clear cart//
     cart.items=[];
     await cart.save();
     res.status(201).json(order);
}; 

export const cancelOrder=async(req,res)=>{
    const order=await Order.findById(req.params.id);
    if(!order){
    
        return res.status(404).json({message:"Order not found"});
    }

    if(order.status==="DELIVERED"){
        return res.status(400).json({message:"Delivered order cannot be cancelled"});

    }
    if(order.status==="CANCELLED"){
        return res.status(400).json({message:"Order already cancelled"});

    }
    //restore stock//
    for(const item of order.orderItems){
        const product=await Product.findById(item.product);
        product.stock+=item.qty;
        await product.save();
    
    }
    order.status="CANCELLED";
    order.cancelledAt=Date.now();
    await order.save();
    res.json({message:"order cancelled and stock restored"});

};