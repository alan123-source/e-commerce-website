import Product from "../models/productModel.js";

//CREATE PRODUCT//
export const  CreateProduct=async(req,res)=>{

    const {name,price,description,stock}=req.body;

    if(!name||price==undefined){
        return res.status(400).json({message:"Name and Price are required"});
    }
    const product =await Product.create({
        name,price,description,stock
    });

    res.status(201).json(product);
};

//Get all products//

export const getProducts=async(req,res) =>{
    const products=await Product.find();
    res.json(products);
};

//Get single Product//
export const getProductById=async(req,res)=>{
    const product=await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({message:"product not found"})
    }

    res.json(product);
}