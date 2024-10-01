import userModel from "../models/User.model.js";
import bcryptsjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptsjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({success:true,message:"User created successfully!"});
  } catch (error) {
    // next(error);
    res.json({success:false,message:error.message});
  }
};

export const signin = async (req, res/* , next */) => {
  const { email, password } = req.body;
  try {
    const vaildUser = await userModel.findOne({ email });
    if (!vaildUser) return /* next(errorHandler(404, "User not found!")); */res.json({success:false,message:"User not found!"})
    const vaildPassword = bcryptsjs.compareSync(password, vaildUser.password);
    if (!vaildPassword) return /* next(errorHandler(401, "Wrong credential!")); */res.json({success:false,message:"User not found!"})
    const token = jwt.sign({ id: vaildUser._id }, process.env.JWT_SECRET);
    //seprate the password for safety
    const { password: pass, ...rest} = vaildUser._doc;
    //save this token as browser cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    // next(error);
    res.json({success:false,message:error.message});
  }
};

export const google = async(req,res) => {
  
  const {name,email,photo} = req.body;

  try {
    const user = await userModel.findOne({email});

    if(user){
      console.log('enter this select');
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET);
      const {password:pass,...rest} = user._doc;
      res
        .cookie('access_token',token,{httpOnly:true})
        .status(200)
        .json(rest);
    }else{
      const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptsjs.hashSync(generatedPassword,10);
      const username = name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4);
      const newUser = new userModel({
        username,
        email,
        password:hashedPassword,
        avatar:photo});
      await newUser.save();
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {password:pass,...rest} = newUser._doc;
      res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
    }
  } catch (error) {
    res.status(401).json({success:false,message:error});
  }
}
