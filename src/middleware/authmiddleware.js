import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
export const protect=async(req,res,next)=>{
  
    let token;
    //check authorization header
    if (
        req.headers.authorization&&
        req.headers.authorization.startsWith("Bearer")
    ){
       try{
        //Extract token
        token=req.headers.authorization.split(" ")[1];

        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        // get user from db without password
        req.user=await User.findById(decoded.id).select("-password");

        next();
       }catch(error){
         console.log(error)
         
        res.status(401).json({message:"Not authorized,token failed"});


       }
    }else{
          res.status(401).json({message:"Not authorized,no token"});
       }

    };


