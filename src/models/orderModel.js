import mongoose from "mongoose";
const orderSchema=new mongoose.Schema(
  {  
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",//refers to user schema //
        required:true
    },
    orderItems:[
        {
        product:{
            type:mongoose.Schema.Types.ObjectId,//references to other schema 
            ref:"Product",
            required:true
        },
        qty:{
            type:Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
       }
   ],

    
    totalPrice:{
        type:Number,
        required:true
    },
    //payment
    isPaid:{
       type:Boolean,
       default:false
    },
    paidAt:{
       type:Date
    },
    paymentIntentId:{
         type:String
    },
    //order status
    status:{
        type:String,
        enum:["PLACED","PAID","SHIPPED","DELIVERED","CANCELLED"],
        default:"PLACED"
    },
    cancelledAt:{
       type:Date
    },
    shippedAt:{
        type:Date
    },
    deliveredAt:{
        type:Date
    },
    isRefunded:{
        type:Boolean,
        default:false
    },
    refundedAt:{
        type:Date
    }
 },
{timestamps:true}

);

const Order=mongoose.model("Order",orderSchema);
export default Order;