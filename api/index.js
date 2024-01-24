import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js';
import Authroutes from './routes/auth.route.js'

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

app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});


//Test API 

app.use('/api/user' , UserRoutes)


//Sign up api routes 

app.use('/api/auth' , Authroutes )