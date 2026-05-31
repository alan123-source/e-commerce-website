import Stripe from "stripe";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js"




//create payment intent//
export const createPaymentIntent=async(req,res)=>{
    //.env fillil ulla enthanelum ath import statementin
    //  sheshm use chyan padilla only inside a function 
    //use chynm illel .env load akila

   
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    const {amount}=req.body;
    if (!amount){
        return res.status(400).json({message:"amount is required"});
    }
    //stripe expects amount is paise
    const paymentIntent=await stripe.paymentIntents.create({
        amount:amount*100,
        currency:"inr",
        automatic_payment_methods:{
            enabled:true
        }
    });

    res.json({
        clientSecret:paymentIntent.client_secret,
      paymentIntentId:paymentIntent.id
    });

};

//refund payment//
export const refundPayment=async(req,res)=>{
  
    const {orderId}=req.body;
    const order=await Order.findById(orderId);
    if (!order){
        
        return res.status(404).json({message:"order not found"});

    }

    if (!order.isPaid){
        return res.status(400).json({message:"order not paid"});

    }

    if(order.status=="DELIVERED"){
        return res.status(400).json({message:"delivered order cannot be refunded"});
    }
    const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);
    //refund//
    await stripe.refunds.create({
        payment_intent:order.paymentIntentId
    });
   for(const item of order.orderItems){
    const product=await Product.findById(item.product);
    product.stock+=item.qty;
    await product.save();
   }

   order.isRefunded=true;
   order.refundedAt=Date.now();
   order.status="CANCELLED";
   await order.save();
   res.json({message:"payment refunded and stock restored"});


};