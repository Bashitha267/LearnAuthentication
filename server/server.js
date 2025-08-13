import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import connectDB from "./config/mongodb.js";
import authRoutes from './routes/authRoutes.js';
const app=express();
const port=process.env.PORT||4000;
//middleware
app.use(express.json());
app.use(cors({credentials:true}));
app.use(cookieParser());

//function
app.listen(port,()=>{
    console.log(`Port is running on :${port}`)
})
//MONGO DB connection
connectDB()
//API End points
app.use('/api/auth',authRoutes)
app.get('/',(req,res)=>{
        res.send("API Working fine")
})



