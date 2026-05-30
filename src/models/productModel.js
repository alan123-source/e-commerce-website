import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    user:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
    },
    name:{
      type:"String",
      required:true
    },
    rating:{
      type:Number,
      required:true
    },
    comment:{
      type:String,
      required:true
    }
},{
  timestamps:true
}
  
);

const productSchema=new mongoose.Schema(
    {
            name:{
        type:String,
        required:true,
        index:true
       },
      price:{
        type:Number,
        required:true
       },

       image:{
        type:String,
        default:"https://via.placeholder.com/200"
       },

       category:{
        type:String,
        required:true
       },
       
      description:{
        type:String
      },
      stock:{
        type:Number,
        default:0
      },
      soldCount:{
        type:Number,
        default:0
      },
      tags:[
        {
          type:String,
          index:true
        }
      ],

      reviews:[reviewSchema],
      rating:{
        type:Number,
        default:0
      },
      numReviews:{
        type:Number,
        default:0
      }
      
       
    },
      {timestamps:true}
);

productSchema.index({price:1,soldCount:-1});
const Product=mongoose.model("Product",productSchema);
export default Product;