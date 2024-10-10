import { Avatar, User } from "@nextui-org/react";
import React from "react";

export default function IndividualContactBox() {
  return (
    <>
      <div className="flex w-full flex-1 gap-3 justify-center  hover:bg-zinc-900 border duration-200 border-transparent hover:border-zinc-200  p-4 px-8 my-2 rounded-md">
        <Avatar size="lg" />
        <div className="flex flex-col ">
          <span>Gemini AI</span>
          <span>last message:message</span>
        </div>
      </div>
    </>
  );
}
