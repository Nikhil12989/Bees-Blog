import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import UserRoutes from './routes/user.route.js'

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

app.listen(3000, () => {
  console.log("Server is Running on port 3000");
});


//Test API 

app.use('/api/user' , UserRoutes)