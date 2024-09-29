import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post('/update/:id',verifyToken,updateUser);

export default userRouter;
