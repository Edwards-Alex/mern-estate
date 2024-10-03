import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser ,deleteUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post('/update/:id',verifyToken,updateUser);
userRouter.delete('/delete/:id',verifyToken,deleteUser);

export default userRouter;
