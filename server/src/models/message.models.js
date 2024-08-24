import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String,
        default:''
    },
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'chat'
    },
    bot:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);


const Message = new mongoose.model('message', messageSchema)

export default Message;