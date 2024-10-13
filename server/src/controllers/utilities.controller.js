import ApiResponse from "../../utils/ApiResponse.js";
import asyncHandler from "../../utils/asyncHandler.js";
import User from "../models/user.models.js";
import Chat from "../models/chat.models.js";
export const allContacts = asyncHandler(async (req, res) => {
  const currUser = req.user;

  // Exclude the current user by using $ne (not equal) operator

  const user = await User.findById(currUser);
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
  const { recipient } = req.body;
  console.log(recipient);
  const user = await User.findByIdAndUpdate(
    recipient,
    {
      $addToSet: {
        friendRequest: req.user._id,
      },
    },
    { new: true }
  );
  //console.log(user);
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "No users found"));
  }
  return res.status(200).json(new ApiResponse(200, "Request sent"));
});

export const acceptRequest = asyncHandler(async (req, res) => {
  const { recipient, sendStatus, isgroupChat } = req.body;

  const updateData = {
    $pull: {
      friendRequest: recipient,
    },
  };
  if (sendStatus) {
    updateData.$addToSet = { friends: recipient };
  }
  const user = await User.findByIdAndUpdate(req.user._id, updateData, {
    new: true,
  });

  if (sendStatus) {
    await User.findByIdAndUpdate(
      recipient,
      {
        $addToSet: { friends: req.user._id },
      },
      { new: true }
    );
  }

  //make a contact as well
  
    const contact = await Chat.create({
      name: null,
      members:[recipient,req.user._id],
      isgroupChat,
      owner:null
    });
  
  if (!user) {
    return res.status(404).json(new ApiResponse(404, "No users found"));
  }
  return res.status(200).json(new ApiResponse(200, "Request Accepted"));
});

export const fetchRequests = asyncHandler(async (req, res) => {
  //fetching the friend requests array
  const requests = await User.findById(req.user)
    .select("friendRequest")
    .populate("friendRequest", "email username");
  console.log(requests);
  if (!requests) {
    return res
      .status(404)
      .json(new ApiResponse(404, "No pending requests found"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { requests: requests.friendRequest }));
});

export const fetchContacts = asyncHandler(async (req, res) => {
  //fetching the friends array
  const contacts = await Chat.find({ members: req.user._id })
    .populate("members","username email").populate("owner","username email");
  if (!contacts) {
    return res.status(404).json(new ApiResponse(404, "No contacts found"));
  }

  return res.status(200).json(new ApiResponse(200, { contacts }));
});
