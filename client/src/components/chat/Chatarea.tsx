import React from "react";
import ChatNav from "../navbars/ChatNav";
import { Input } from "@nextui-org/input";
import MessageComponent from "./MessageComponent";

export default function Chatarea() {
  return (
    <>
      <div className="flex-co flex-1 max-h-[90%]">
        <ChatNav />

        <div className="flex-col chatarea justify-center items-center h-full gap-4 p-4">
          <div className="flex-col h-[80%]  message_area">
           <MessageComponent/>
           <MessageComponent/>
           <MessageComponent/>
           <MessageComponent/>
           <MessageComponent/>
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
