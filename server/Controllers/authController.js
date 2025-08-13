import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    //checking any missing credentials
    if(!name||!email||!password){
        return res.json({success:false,message:"Missing credentials"})
    }
    try{
        //finding exisiting users with same email
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"User Already Exists"})
        }
        //saving new user in data base and hashing password
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new userModel({name,email,password:hashedPassword});
        await user.save()
        //generate token
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}) //first one is user model user _id,then secrt text,then expirey town
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production', //when we are in development this will be true our env is 'development'
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*3600*1000 //expire time in miliseconds

        })
        return res.json({success:true})

    }
    catch(e){
        res.json({success:false,message:e})
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
        return res.json({success:false,message:"Email and password is required"})
    }
    try{
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({success:false,mesage:"Invalid Email"})
        }
        const isMatch=await bcrypt.compare(password,user.password)  //user input pasword and password for particular email in database 
        if(!isMatch){
             return res.json({success:false,mesage:"Invalid Password"})
        }
          const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'}) //first one is user model user _id,then secrt text,then expirey town
        res.cookie('token',token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production', //when we are in development this will be true our env is 'development'
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
            maxAge:7*24*3600*1000 //expire time in miliseconds

        })
        return res.json({success:true})
        
    }
    catch(e){
        return res.json({success:false,message:e})
    }
}

export const logout=async(req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production', //when we are in development this will be true our env is 'development'
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',
        })
        return res.json({success:true,message:"user successfully Logged Out"})
    }
    catch(err){
        return res.json({success:false,message:err})
    }
}