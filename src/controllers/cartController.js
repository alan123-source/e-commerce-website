import Cart from "../models/cartModel.js";

//get cart//
export const getCart=async(req,res)=>{
    let cart=await Cart.findOne({user:req.user._id}).populate("items.product","name price");
    if (!cart){
        cart=await Cart.create({user:req.user._id,items:[]});
    }
    res.json(cart);
};

//add to cart//

export const addToCart=async(req,res)=>{

  const {productId,qty}=req.body;
  let cart=await Cart.findOne({user:req.user._id});
  if (!cart){
    cart=await Cart.create({user:req.user._id,items:[]});
  }

  const itemIndex=cart.items.findIndex((item)=>item.product.toString()===productId);

  if(itemIndex>-1){
    cart.items[itemIndex].qty+=qty;
  }else{
    cart.items.push({product:productId,qty});
  }

  await cart.save();
  res.json(cart);

};

//remove from cart//
export const removeFromCart=async(req,res)=>{
   const {productId}=req.params;
   const cart=await Cart.findOne({user:req.user._id});

   if(!cart){
    return res.status(404).json({message:"Cart not found"});
   }
   cart.items=cart.items.filter((item)=>item.product.toString()!==productId);
   await cart.save();
   res.json(cart);
};
