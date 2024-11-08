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
    res.status(200).json({ success: true, updatedListing });
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    res.status(200).json({ success: true, listing });
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    // limit show numbers of result.
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    // set to a query that can match either false or true values in a MongoDB query.
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sell"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "ceratAt";

    const order = req.query.order || 'desc';

    //build the query object 
    const query = {
      offer,
      furnished,
      parking,
      type
    }

    //add name filter only if searchTerm is not empty
    if(searchTerm.trim() !== ""){
      //$options:'i': searh all either lowercase or uppercase.
      // $regex:searchTerm：allow to search for listings that contain searchTerm.
      query.name = {$regex: searchTerm, $options: 'i' }
    }

    const listings = await listingModel.find(
        query
    ).sort(
      {[sort]: order}
    ).limit(limit).skip(startIndex);

    return res.status(200).json({success:true,listings});
    
  } catch (error) {
    next(error);
  }
};
