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

const connectDBServerless = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

// Middleware
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());

// Ensure DB is connected before any request
app.use(async (req, res, next) => {
  if (!isConnected) {
    await connectDBServerless();
  }
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API Working fine");
});

// ✅ Default export for Vercel
export const handler = serverless(app);
