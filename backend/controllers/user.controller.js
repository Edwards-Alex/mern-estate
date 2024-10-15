import listingModel from "../models/listing.model.js";
import userModel from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    rest.message = "updated user successfully";
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log(req.params.id);
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account!"));
  }
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
};

export const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id == req.params.id) {
      try {
        const listings = await listingModel.find({ userRef: req.params.id });
        res.status(200).json({success:true,listings,message:'Show listings success!'});
      } catch (error) {
        next(error);
      }
    } else {
      return res.json({
        success: false,
        message: "You can only view your own listings!",
      });
    }
  } catch (error) {
    next(error);
  }
};
