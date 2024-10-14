import Chatarea from "@/components/chat/Chatarea";
import ContactArea from "@/components/chat/ContactList";
import { Divider, Spinner } from "@nextui-org/react";
import React from "react";
import { useLocation } from "react-router-dom";

export default function Chat() {
  const location = useLocation();
  console.log("path name", location);

  //fetch currchat here
  return (
    <>
      <div className="flex   w-full h-full   fixed to-10">
        <ContactArea />
        <Divider orientation="vertical" className="bg-purple-800 w-[2px]" />
        {location.pathname !== "/" ? <Chatarea /> : <Spinner />}
      </div>
    </>
  );
}
