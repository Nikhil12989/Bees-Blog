import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';
import Authroutes from './routes/auth.route.js';
import PostRoutes from './routes/post.route.js';
import cookieParser from "cookie-parser";

dotenv.config()

mongoose
  .connect(
    process.env.MONGO
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});


//Test API 

app.use('/api/user' , UserRoutes)


//Sign up api routes 

app.use('/api/auth' , Authroutes )

//post api routes
app.use('/api/post' , PostRoutes)


app.use((err , req , res , next) => {
  const statusCode =  err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  res.status(statusCode).json({
    success:false,
    statusCode, 
    message,
  })
})