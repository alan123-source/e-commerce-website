import express from "express";
import sendEmail from "../utils/sendEmail.js";
const router=express.Router();

router.get("/",async(req,res)=>{

    try{

        await sendEmail({
            email:"e00435254@gmail.com",
            subject:"Test Email",
            message:`<h1>email working</h1>
            <p>your ecommerce email system works.</p>
            `
        });

        res.json({
            success:true,
            message:"Email sent"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Email Falied"
        });
    }
});

export default router;
