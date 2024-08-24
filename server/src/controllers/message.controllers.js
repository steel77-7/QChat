import ApiError from "../../utils/ApiError.js";
import asyncHanlder from "../../utils/asyncHandler.js";
import generateResponse from "../../utils/geminiApi.js";
import Message from "../models/message.models.js";

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
    return res.status(500).json(new ApiError(500, "Message failed to save"));
  }

  req.io.to(chatid).emit('recieve-message',saved_message);
  //return saved_message;
});



export const deleteMessage = asyncHanlder(async (req, res) => {});
export const editMessage = asyncHanlder(async (req, res) => {});
