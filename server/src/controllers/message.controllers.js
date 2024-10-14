import ApiResponse from "../../utils/ApiResponse.js";

import asyncHanlder from "../../utils/asyncHandler.js";
import generateResponse from "../../utils/geminiApi.js";
import { getOrSetCache } from "../../utils/redisClient.js";
import Message from "../models/message.models.js";
import Redis from "redis";

export const saveMessage = asyncHanlder(async (req, res) => {
  const user = req.user;
  const { chatid, message } = req.body;

  //should work but its to be tested rn
  if (user.botStatus) {
    const response = await generateResponse(message);
  }

  const saved_message = await Message.create({
    message: user.botStatus ? response : message,
    chat: chatid,
    sender: user._id,
    bot: user.botStatus,
  });

  if (!saved_message) {
    return res.status(500).json(new ApiResponse(500, "Message failed to save"));
  }

  //req.io.to(chatid).emit("recieve-message", saved_message);
  //return saved_message;
});

export const fetchMessage = asyncHanlder(async (req, res) => {
  const  chatid = req.params.chatid;
  const user = req.user;

  const fetch_message = async () => {
    const message = await Message.find({ chat: chatid }).populate('members', 'username email');
    return message;
  };
  const response = await getOrSetCache("message", fetch_message);
  if (response === null || response.length === 0)
    return res.status(404).json(new ApiResponse(404, "MEssgaes not found "));
  res
    .status(200)
    .json(
      new ApiResponse(200, { messageArray: response })
    );
});


export const deleteMessage = asyncHanlder(async (req, res) => {

  
});
export const editMessage = asyncHanlder(async (req, res) => {});
