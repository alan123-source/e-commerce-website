import express from 'express';
import helmet from "helmet";
import rateLimit from 'express-rate-limit';
import errorHandler from './middleware/errorMiddleware.js';
import morgan from "morgan";
import cors from "cors"

//Routes
import userRoutes from "./routes/userRoutes.js";
import { protect } from './middleware/authmiddleware.js';
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from './config/swagger.js';
import wishlistRoutes from "./routes/wishlistRoutes.js";

const app=express();
if (process.env.NODE_ENV!="production"){
  app.use(morgan("dev"));
}
app.use(cors());
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
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));
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
app.use("/api/payment",paymentRoutes);
app.use("/api/cart",cartRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/recommendations",recommendationRoutes);
app.use("/api/wishlist",wishlistRoutes);
app.use(errorHandler);

//app.use((req,res)=>{
  //res.status(404).json({
   // message:"Route not found"
  //});
//});
/* dummy routes app.get("/api/error-test",(req,res)=>{
  throw new Error("this is a test error");
});*/
app.use(errorHandler);
export default app;
 