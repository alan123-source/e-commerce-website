import Order from "../models/orderModel.js";

//create order//
export const createOrder=async(req,res)=>{
    const {orderItems,totalPrice}=req.body;
    if(!orderItems||orderItems.length==0){
        return res.stats(400).json({message:"No order items"});
    }

    const order=await Order.create({
        user:req.user._id,
        orderItems,
        totalPrice
  });
  res.status(201).json(order);
};

//get user orders//

export const getMyOrders=async(req,res)=>{
   const orders=await Order.find({user:req.user._id});
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