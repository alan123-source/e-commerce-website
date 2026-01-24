import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";
import Product from "../models/productModel.js";

//create order//
export const createOrder=async(req,res)=>{
    const {orderItems,totalPrice}=req.body;
    if(!orderItems||orderItems.length==0){
        return res.status(400).json({message:"No order items"});
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
     for (const item of cart.items){
        const price=item.product.price;
        totalPrice+=price*item.qty;
        orderItems.push({
            product:item.product._id,
            qty:item.qty,
            price
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
