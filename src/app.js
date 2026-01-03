import express from 'express';
import userRoutes from "./routes/userRoutes.js";
import { protect } from './middleware/authmiddleware.js';
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app=express();
//built in miidlewares
app.use(express.json());
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

export default app;
