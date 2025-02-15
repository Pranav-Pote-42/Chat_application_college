import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        const conn= await mongoose.connect(process.env.MONGODB_URI);
        console.log(`The server has been connected with MongoDB: ${conn.connection.host}`)
    } catch (error) {
        console.log("error while connection to Mongo DB:",error)
    }
};