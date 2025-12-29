 import mongoose from "mongoose";
 const UserSchema= new mongoose.Schema(
    {
     
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        }

        },

        {timestamps:true}
        /*meta data stored in  db by automatically 
       iit automaticaly stores cretedat and updatedat.
        timestamp is stored as metadata*/
    );

    const User=mongoose.model("User",UserSchema);
    export default User;