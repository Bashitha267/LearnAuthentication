import mongoose from "mongoose";

let isConnected = false; // cache connection for serverless

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(
      "mongodb+srv://nimeshspc2k17:1234@cluster0.oxybnxt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err;
  }
};

export default connectDB;
