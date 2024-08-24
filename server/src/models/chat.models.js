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
      required: true,
    },
    botChat:{
      type:Boolean,
      default:false
    },
    groupChat:{
      type :Boolean,
      default :false
    },
    owner: { 
      type: String,
    }
  },
  {
    timestamps: true,
  }
);

const Chat = new mongoose.model("message", messageSchema);

export default Chat;
