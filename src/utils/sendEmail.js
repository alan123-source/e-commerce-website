import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);
const transporter=nodemailer.createTransport({

    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    },

});

const sendEmail=async(options)=>{
    const mailOptions={
        from:process.env.EMAIL_USER,
        to:options.email,
        subject:options.subject,
        html:options.message
    }

    await transporter.sendMail(mailOptions)
    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS)
};

export default sendEmail;