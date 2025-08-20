import express from 'express';
import { login, logout, register, sendVerifyOtp, verifyEmail } from '../Controllers/authController.js';

const authRouter=express.Router();
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.post('/logout',logout)
authRouter.post('/verifyEmail',verifyEmail)
authRouter.post('/sendOTP',sendVerifyOtp)
// authRouter.
export default authRouter;