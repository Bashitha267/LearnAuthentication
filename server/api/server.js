import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import serverless from "serverless-http";

import connectDB from "../config/mongodb.js";
import authRoutes from "../routes/authRoutes.js";

const app = express();

// MongoDB connection (serverless-friendly)
let isConnected = false;

// Connect once at startup
const connectDBServerless = async () => {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
      console.log("MongoDB connected");
    } catch (err) {
      console.error("MongoDB connection failed:", err);
    }
  }
};

// Start DB connection without blocking requests
connectDBServerless();

// Middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API Working fine");
});

export default serverless(app);
