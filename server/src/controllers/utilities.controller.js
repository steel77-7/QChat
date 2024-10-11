import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";

export const allContacts = asyncHandler(async (req, res) => {
  const currUser = req.user;

  // Exclude the current user by using $ne (not equal) operator
  const contact_list = await User.find({ _id: { $ne: currUser._id } })
    .select('email username');

  console.log("contact list", contact_list);

  if (!contact_list || contact_list.length === 0) {
    return res.status(404).json(new ApiResponse(404, "No users found"));
  }

  return res.status(200).json(new ApiResponse(200, contact_list));
});
