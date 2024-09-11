import userModel from "../models/User.model.js";
import bcryptsjs from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptsjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};
