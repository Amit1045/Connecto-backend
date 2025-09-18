import mongoose from "mongoose";

export const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.mongoDB_url)
        console.log("Database connect successfully ✅",conn.connection.host);
        
    } catch (error) {
        console.log("Error : ",error.message);   
    }
}