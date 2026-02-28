import mongoose from "mongoose";


const userModel = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
     Image:{
        type:String,
    },
      email:{
        type:String,
        require:true
    },
      password:{
        type:String,
    }
},{timestamps:true})


export default mongoose.models.user || mongoose.model("user",userModel) 