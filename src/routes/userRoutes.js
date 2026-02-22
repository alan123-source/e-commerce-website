import express from "express";
import {body,validationResult} from "express-validator";
import { registerUser,loginUser } from "../controllers/userController.js";

 const router=express.Router();
 router.post("/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("valid email required"),
        body("password").isLength({min:6}).withMessage("password must be at least 6 charecters"),
    ],
    async (req,res,next)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        next();
    },
    registerUser);
 router.post("/login",loginUser);

 export default router;