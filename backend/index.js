import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";

mongoose
  .connect(process.env.MOGO)
  .then(() => {
    console.log("Connect to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 8888;


app.use(express.json());

app.use(cookieParser());

//middleware
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error!!!';

  return res.status(statusCode).json({success:false,statusCode,message,});
  
});

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);



app.listen(port, () => {
  console.log(`Server is runing on port ${port}!`);
});

