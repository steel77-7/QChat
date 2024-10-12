import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";

export const allContacts = asyncHandler(async (req, res) => {
  const currUser = req.user;

  // Exclude the current user by using $ne (not equal) operator
  const contact_list = await User.find({ _id: { $ne: currUser._id } }).select(
    "email username"
  );

  console.log("contact list", contact_list);

  if (!contact_list || contact_list.length === 0) {
    return res.status(404).json(new ApiResponse(404, "No users found"));
  }

  return res.status(200).json(new ApiResponse(200, contact_list));
});

export const sendRequest = asyncHandler(async (req, res) => {
  const {recipient} = req.body;
  console.log(recipient)
  const user = await User.findByIdAndUpdate(
    recipient,
    {
      $push: {
        friendRequest: req.user._id,
      },
    },
    { new: true }
  );
  console.log(user)
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "No users found"));
  }
  return res.status(200).json(new ApiResponse(200, "Request sent"));
});

export const acceptRequest = asyncHandler(async (req, res) => {
  const reqid = req.body._id;
  const user = await User.findByIdAndUpdate(
    reqid,
    {
      $push: {
        friends: req._id,
      },
      $pull:{
        friends:req._id
      }
    },
    { new: true }
  );
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "No users found"));
  }
  return res.status(200).json(new ApiResponse(200, "Request sent"));
});

export const fetchRequests = asyncHandler(async (req, res) => {
  //fetching the friend requests array
  const requests = await User.findById(req.user).select("friendRequest").populate();
  console.log(requests)
  if (!requests) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No pending requests found"));
  }

  return res.status(200).json(new ApiResponse(200, { requests: requests.friendRequest }));
});

export const fetchContacts = asyncHandler(async (req, res) => {
  //fetching the friends array
  const contacts = await User.findById(req.user).select("friends").populate();
  if (!requests) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No pending requests found"));
  }

  return res.status(200).json(new ApiResponse(200, { contacts }));
});
