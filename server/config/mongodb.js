import mongoose from "mongoose";
const connectDB=async()=>{
    try{
    await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("connected")


    }
    catch(e){
        console.log(e)
    }
}
export default connectDB;