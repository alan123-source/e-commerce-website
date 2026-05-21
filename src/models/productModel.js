import mongoose from "mongoose";
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
      ]
      
       
    },
      {timestamps:true}
);

productSchema.index({price:1,soldCount:-1});
const Product=mongoose.model("Product",productSchema);
export default Product;