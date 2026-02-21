import mongoose from 'mongoose';
const connectDB=async(url)=>{
  try{
    mongoose.set("strictQuery",true);
    const conn=await mongoose.connect(url,{
      autoIndex:true,
    });
    console.log(`MongoDB connected:${conn.connection.host}`);
  }catch(err){
    console.log("mongodb connection error",err.message);
    process.exit(1)
  }
}

export default connectDB