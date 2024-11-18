import  mongoose from "mongoose";

const UserSchema = mongoose.Schema({

    dni:{
        type:String,
        required:true,
    },
     password:{
        type:String,
        required:true,
     }
    
}, {timestamps: true});


export default mongoose.model("users",UserSchema);