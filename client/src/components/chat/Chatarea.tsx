import React, { useEffect, useState } from "react";
import ChatNav from "../navbars/ChatNav";
import { Input } from "@nextui-org/input";
import MessageComponent from "./MessageComponent";
import { useSelector } from "react-redux";
import apiCall from "@/utils/apiCall";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export default function Chatarea() {
  const [messages, setMessages] = useState<Array<any>>([]);
  const [inputVal, setInputVal] = useState<any>("");
  const socket = useSelector((state: any) => state.appData.socketInstance);
  const location = useLocation();
  const currChatid = location.pathname.substring(1);

  //fetch messages according to the path name
  useEffect(() => {
   ;(async () => {
      const { data, status } = await apiCall({
        url: `messages/fetch_messages/:${currChatid}`,
        method: "GET",
      });
      console.log('messages array',data)
      if (status !== 200) {
        toast.error("Messages could not be fetched");
        return;
      }
      if(messages?.length==0)
      setMessages(data.messageArray);
      //console.log(data);
    })(); 
  }, []);

  async function handleSend(e: any) {
    try {
      if (e.code == "Enter") {
        //frist save in the db
        const { data, status } = await apiCall({
          url: "messages/save-message",
          method: "POST",
          reqData: {
            room: currChatid,
            message: inputVal,
          },
        });
        if (status !== 200) {
          toast.error("message not sent");
          return;
        }
        console.log(data);
        setMessages((prev:any)=>[...prev,data.message])
        //then if the res is daved in the db then it is sent to the room
        console.log("message sending");
        socket.emit("send-message", data.message);
        //socket.emit("send-message",{chat:currChatid, message:inputVal});
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    function handleRecieveMessage(data: any) {
      console.log(data);
      setMessages((prev:any)=>[...prev,data.message])
    }
    socket.on("recieve-message", handleRecieveMessage);

    return () => {
      socket.off("recieve-message", handleRecieveMessage);
    };
  });

  return (
    <>
      <div className="flex-co flex-1 max-h-[90%]">
        <ChatNav />

        <div className="flex-col chatarea justify-center items-center h-full gap-4 p-4">
          <div className="flex-col h-[80%]  message_area">
          {messages&&messages?.length>0?messages.map((message:any)=><MessageComponent/>):<p>Empty</p>}
          </div>
          <Input
            type="text"
            label="Type here..."
            variant="bordered"
            className="w-[95%] "
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleSend}
          />
        </div>
      </div>
    </>
  );
}
