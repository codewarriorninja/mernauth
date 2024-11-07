import mongoose from "mongoose";

const connectDB = async (MONGODB_URI) => {
    try {
       const conn = await mongoose.connect(MONGODB_URI) 
       console.log(`Connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1);
    }
}


export default connectDB;