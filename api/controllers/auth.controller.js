import { errorHandler } from '../utils/error.js';
import User from './../models/userModel.js';
import bcryptjs from  'bcryptjs';


// Sign- up Controller 

export const Signup = async(req , res , next ) => {
 const { username , email , password}  = req.body 

 if (!username || !email || !password  || username==='' || email === '' || password === '') {
     next(errorHandler(400 , " All Fileds are required"))
 } 
 
 const hashedPassword = bcryptjs.hashSync(password , 10)
 const newUser =  new User({
    username,
    email,
    password:hashedPassword
 })

 try {
    await newUser.save();
    res.json({message:"Sign up Successful"})
 } catch (error) {
    next(error)
 }
  
}