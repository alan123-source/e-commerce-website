import express from 'express';
const app=express();
//built in miidlewares
app.use(express.json());
//health routes
app.get('/',(req,res)=>{
  res.send("ecommerce api is running");
}
);

export default app;
