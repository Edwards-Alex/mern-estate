import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js";

mongoose
  .connect(process.env.MOGO)
  .then(() => {
    console.log("Connect to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

//middleware
app.use(express.json());

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.listen(port, () => {
  console.log(`Server is runing on port ${port}!`);
});

