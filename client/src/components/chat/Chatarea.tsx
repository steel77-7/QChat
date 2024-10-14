import React, { useEffect, useState } from "react";
import ChatNav from "../navbars/ChatNav";
import { Input } from "@nextui-org/input";
import MessageComponent from "./MessageComponent";
import { useSelector } from "react-redux";
import apiCall from "@/utils/apiCall";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export default function Chatarea() {
  const [messages, setMessages] = useState<any>(null);
  // const socket = useSelector((state: any) => state.appData.socketInstance);
  const location = useLocation();
  const currChatid = location.pathname.substring(1);
  console.log('curchat',currChatid)

  //fetch messages according to the path name

  /*   useEffect(() => {
  ;(async ()=>{
    const {data,status} = await apiCall({
      url: `messages/fetch_messages/:${currChatid}`,
      method:"GET"
    })
    if(status==200) {
      toast.error('Messages could not be fetched');
      return 
    }
   setMessages(data.messageArray);
   console.log(data)
  })()
  }, [location]); */
  return (
    <>
      <div className="flex-co flex-1 max-h-[90%]">
        <ChatNav />

        <div className="flex-col chatarea justify-center items-center h-full gap-4 p-4">
          <div className="flex-col h-[80%]  message_area">
            <MessageComponent />
            <MessageComponent />
            <MessageComponent />
            <MessageComponent />
            <MessageComponent />
          </div>
          <Input
            type="text"
            label="Type here..."
            variant="bordered"
            className="w-[95%] "
          />
        </div>
      </div>
    </>
  );
}
