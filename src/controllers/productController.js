import Product from "../models/productModel.js";
import { successResponse } from "../utils/apiResponse.js";

//CREATE PRODUCT//
export const  CreateProduct=async(req,res)=>{

    const {name,price,description,stock}=req.body;

    if(!name||price==undefined){
        return res.status(400).json({message:"Name and Price are required"});
    }
    const product =await Product.create({
        name,price,description,stock
    });
    successResponse(res,product,201);
    res.status(201).json(product);
};

//Get all products//
//pagination used//

export const getProducts=async(req,res) =>{
    const {keyword,page=1,limit=10}=req.query;
    //build search query//
    const query={};
    if(keyword){
        query.name={$regex:keyword,$options:"i"};
    }
    const skip=(page-1)*limit;
    const products=await Product.find(query).skip(skip)
    .limit(Number(limit));
    const total=await Product.countDocuments(query);
    res.json({
        success:true,
        data:products,
        pagination:{
            total,
            page:Number(page),
            pages:Math.ceil(total/limit)
        }
    });
};

//Get single Product//
export const getProductById=async(req,res)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({message:"product not found"})
    }

    res.json(product);
}

//update product put method is used here//
export const updateProduct=async(req,res)=>{

    const productId=req.params.id;
    const product=await Product.findById(productId);
    if(!product){
        return res.status(404).json({message:"product not found"});
    }
    //newvalue||old value||
    product.name=req.body.name||product.name;
    product.price=req.body.price||product.price;
    product.description=req.body.description||req.description;
    product.stock=req.body.stock||req.stock;

    const updateProduct=await product.save();
    res.json(updateProduct);
}

//delete product //
export const deleteProduct=async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(!product){
        return res.status(404).json({message:"product not found"});

    }

    await product.deleteOne();
    res.json({message:"product removed succesfully"});
};