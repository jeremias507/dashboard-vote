import mongoose, { connect } from "mongoose";


export const connectToDB=async()=>{
  
    try{
        await mongoose.connect('mongodb://localhost:27017')

        console.log("Connected to mongodb")
    }catch(error){
        console.log("Error connecting to MongoDB",error)
    }


}