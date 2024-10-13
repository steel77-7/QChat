import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    name: {
      type: String,
    },
    botChat: {
      type: Boolean,
      default: false,
    },
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default:null
    },
  },
  {
    timestamps: true,
  }
);

const Chat = new mongoose.model("chat", messageSchema);

export default Chat;
