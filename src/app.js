import express from 'express';
import helmet from "helmet";
import rateLimit from 'express-rate-limit';

//Routes
import userRoutes from "./routes/userRoutes.js";
import { protect } from './middleware/authmiddleware.js';
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
//import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";

const app=express();
//security http//
app.use(helmet());



//built in miidlewares
app.use(express.json({limit:"10kb"}));

//prevent mongoDB injection//


const limiter=rateLimit({
  windowMs:15*60*1000,
  max:100,
  message:"to many request from this ip,please try again later"
});
app.use(limiter);

//health routes
app.get('/',(req,res)=>{
  res.send("ecommerce api is running");
}
);

//protected route
app.get("/api/protected",protect,(req,res)=>{
  res.json({
    message:"you are authorized",
    user:req.user
  });
});
app.use("/api/users",userRoutes);
app.use("/api/products",productRoutes);
app.use("/api/orders",orderRoutes);
//app.use("/api/payments",paymentRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/recommendations",recommendationRoutes);

app.use((req,res)=>{
  res.status(404).json({
    message:"Route not found"
  });
});
export default app;
 