import listingModel from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await listingModel.create(req.body);
    return res.status(201).json({
      success: true,
      message: "Create listing success",
      listing,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your own listings!"));
  }
  try {
    await listingModel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ success: true, message: "Listing has been deleted!" });
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await listingModel.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listing!"));
  }

  try {
    const updatedListing = await listingModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      //{new : true} : get new listing not pre listing in the return
      { new: true }
    );
    res.status(200).json({success:true,updatedListing});
  } catch (error) {
    next(error);
  }
};
