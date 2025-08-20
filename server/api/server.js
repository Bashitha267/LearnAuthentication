import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import serverless from "serverless-http";
import connectDB from "../config/mongodb.js";
import authRoutes from '../routes/authRoutes.js';
const app=express();
const port=process.env.PORT||4000;
//middleware
app.use(express.json());
app.use(cors({credentials:true}));
app.use(cookieParser());

//function
// app.listen(port,()=>{
//     console.log(`Port is running on :${port}`)
// })
//MONGO DB connection
const connectDBServerless = async () => {
  if (!isConnected) {
    try {
      await connectDB(); // make sure this returns a promise
      isConnected = true;
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
      throw err; // function will fail if DB cannot connect
    }
  }
};
//API End points
app.use('/api/auth',authRoutes)
app.get('/',(req,res)=>{
        res.send("API Working fine")
})
export const handler = serverless(app);


