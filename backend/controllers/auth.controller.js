import userModel from "../models/User.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new userModel({ username, email, password });
  await newUser.save();
  res.status(201).json("User created successfully!");
};
