import Stripe from "stripe";




//create payment intent//
export const createPaymentIntent=async(req,res)=>{
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
        clientSecret:paymentIntent.client_secret
    });

};