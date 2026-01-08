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
            type:mongoose.Schema.Types.ObjectId,
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
    status:{
        type:String,
        enum:["PLACED","SHIPPED","DELIVERED"],
        default:"PLACED"
    },
    shippedAt:{
        type:Date
    },
    deliveredAt:{
        type:Date
    }
 },
{timestamps:true}

);

const Order=mongoose.model("Order",orderSchema);
export default Order;