 import dotenv from 'dotenv';
 dotenv.config();
 import app from './app.js';
 import connectDB  from './config/db.js';
 const PORT=process.env.PORT||5000;
 const MONGO_URI=process.env.MONGO_URI;
 if (!MONGO_URI){
  
  console.log('MONGO_URI missing in .env',process.env.MONGO_URI);
  process.exit(1);
}

const start=async()=>{
  await connectDB(MONGO_URI);
  app.listen(PORT,()=>{
  
    console.log(`server running in port ${PORT}`);

  });
}
  start();