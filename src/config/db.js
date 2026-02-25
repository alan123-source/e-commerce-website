import mongoose from "mongoose";

const connectDB=async()=>{
  try{
       mongoose.set("strictQuery",true);
       const uri=process.env.NODE_ENV==="test"
       ? process.env.MONGO_TEST_URI
       :process.env.MONGO_URI;
       const conn=await mongoose.connect(uri,{
        autoIndex:true,
       });
       console.log(`MongoDB connected:${conn.connection.host}`);
  }catch(err){
     console.log("mongodb connection error",err.message);
     process.exit(1);
  }
}

export default connectDB;