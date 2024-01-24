import User from './../models/userModel.js';
import bcryptjs from  'bcryptjs';


// Sign- up Controller 

export const Signup = async(req , res ) => {
 const { username , email , password}  = req.body 

 if (!username || !email || !password  || username==='' || email === '' || password === '') {
    return res.status(400).json({message: "All Fields are Required"}) 
 }
 
 const hashedPassword = bcryptjs.hashSync(password , 10)
 const newUser =  new User({
    username,
    email,
    password:hashedPassword,

 try {
    await newUser.save();
    res.json({message:"Sign up Successful"})
 } catch (error) {
    res.status(500).send({message:error.message})
 }
}