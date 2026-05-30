import Product from "../models/productModel.js";
import { successResponse } from "../utils/apiResponse.js";

//CREATE PRODUCT//
export const  CreateProduct=async(req,res)=>{

    const {name,image,price,description,stock,category}=req.body;

    if(!name||price==undefined){
        return res.status(400).json({message:"Name and Price are required"});
    }
    const product =await Product.create({
        name,image,price,description,stock,category
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
    product.image=req.body.image||product.image;
    product.price=req.body.price||product.price;
    product.description=req.body.description||req.description;
    product.stock=req.body.stock||req.stock;
    product.category=req.body.category||req.category;


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

export const createProductReview=async(req,res)=>{
    try{
        const product=await Product.findById(
            req.params.id
        );

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }

        const alreadyReviewed=product.reviews.find((review)=>
          review.user.toString()===req.user._id.toString()
        );
        if(alreadyReviewed){
            return res.status(400).json({
                message:"Product already reviewed"
            });
        }

        const review={
            user:req.user._id,
            name:req.user.name,
            rating:Number(req.body.rating),
            comment:req.body.comment
        };

        product.reviews.push(review);
        product.numReviews=product.reviews.length;
        product.rating=product.reviews.reduce(
        (acc,item)=>
            item.rating+acc,0
        )/product.reviews.length;

        await product.save();
        res.status(201).json({
            message:"Review added"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Server Error"
        })
    }
}

export const deleteReview=async(req,res)=>{
    try{

        const product=await Product.findById(req.params.productId);
        if(!product){
            res.status(404).json({
                message:"Product not found"
            })
        }
           const review=product.reviews.find((review)=>
            review._id.toString()===req.params.reviewId
        );

        if(!review){
            return res.status(404).json({
                message:"Review not found"
            });
        }
        if(review.user.toString()!==req.user._id.toString()){
            return res.status(401).json({
                message:"Not authorized"
            });
        }
        product.reviews=product.reviews.filter(
            (review)=>
                review._id.toString()!==req.params.reviewId
        );
        product.numReviews=product.reviews.length;
        product.rating=product.reviews.length >0
        ?product.reviews.reduce(
            (acc,item)=>acc+item.rating,0
        )/product.reviews.length
        :0;
        await product.save();
        res.json({
            message:"Review Deleted"
        });
    }catch(error){

        console.log(error);
        res.status(500).json({
            message:"server error"
        });

    }
};