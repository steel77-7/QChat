import ApiResponse from "../../utils/ApiResponse.js";
import asyncHanlder from "../../utils/asyncHandler.js";
import Chat from "../models/chat.models.js";

export const createChat = asyncHanlder(async (req, res) => {
  const user = req.user;
  const { members, name } = req.body;

  const createdChat = await Chat.create({
    members: members,
    owner: user._id,
    name: name ? name : null,
    groupChat: members.length > 2 ? true : false,
  });

  const chat = await findById(createdChat._id);
  if (!chat) {
    return res
      .status(500)
      .json(new ApiResponse(500, "Server error occured while creating chat"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, { data: chat, message: "Chat created" }));
});

//export const createGroup = () => {};

//addMembers
export const addMembers = asyncHanlder(async (req, res) => {
  const user = req.user;
  const { addedMembers, chatid } = req.body;
  const chat = await Chat.findByIdAndUpdate(
    chatid,
    {
      $push: { members: addedMembers },
    },
    { new: true }
  );

  if (!chat) {
    return res.status(404).json(new ApiResponse(404, "Chat not found"));
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { message: "Members added", data: chat }));
});

//delete chat
export const deleteChat = asyncHandler(async (req, res) => {
  const { chatid } = req.body;
  const user = req.user;

  const chat = await Chat.findOneAndDelete({ _id: chatid, owner: user._id });

  if (!chat) {
    return res
      .status(404)
      .json({ error: "Chat not found or user unauthorized" });
  }

  return res.status(200).json({ message: "Chat Deleted" });
});
