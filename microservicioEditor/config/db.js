import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
         await mongoose.connect(process.env.MONGODB_URI)
         console.log("mongoDB connect")
    } catch (error) {
        console.log("Error al conectar mongoDB",error)
    }
}

export default connectDB