import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

//register giving tokens for new user//
 export const registerUser=async(req,res)=>{
    const {name,email,password}=req.body;

    if (!name||!email||!password){
        return res.status(400).json({message:"All fields required"});
    }

    const userExists=await User.findOne({email});
    if (userExists){
        res.status(400).json({meassage:"User already exist"});
    }

     const hashedpassword=await bcrypt.hash(password,10);
 const user=await User.create({

    name,
    email,
    password:hashedpassword

 });

 res.status(201).json({
    _id:user._id,
    name:user.name,
    email:user.email,
    token:generateToken(user._id),
    role:user.role
 });
    
 };

 //Login//

 export const loginUser=async(req,res)=>{
  
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if (user &&(await bcrypt.compare(password,user.password))){

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
            role:user.role

        });

    }else{
        res.status(401).json({meassage:"invalid email or password"});
    }



};


