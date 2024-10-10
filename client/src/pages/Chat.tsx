import Chatarea from "@/components/chat/Chatarea";
import ContactArea from "@/components/chat/ContactList";
import { Divider } from "@nextui-org/react";
import React from "react";

export default function Chat() {
  return (
    <>
      <div className="flex   w-full h-full   fixed to-10">
        <ContactArea />
        <Divider orientation="vertical" className="bg-purple-800 w-[2px]"/>
        <Chatarea  />
      </div>
    </>
  );
}
