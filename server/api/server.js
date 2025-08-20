import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import serverless from "serverless-http";
import connectDB from "../config/mongodb.js";
import authRoutes from '../routes/authRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
  res.send("API Working fine");
});

// Serverless handler
export const handler = serverless(app);

// MongoDB connection (serverless-friendly)
let isConnected = false; // cache connection across invocations

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

// Wrap routes in a middleware to ensure DB is connected
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDBServerless();
  }
  next();
});
