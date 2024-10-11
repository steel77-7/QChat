import { Avatar, User } from "@nextui-org/react";
import React from "react";

export default function IndividualContactBox({user}:any) {

  function format(str:string){ 
    if( str.length>25){
      return  str.substring(0,25)+"...";
    }
  else return str;
  }
  return (
    <>
      <div className="flex w-full flex-1 gap-3   hover:bg-zinc-900 border duration-200 border-transparent hover:border-zinc-200  p-4 px-8 my-2 rounded-md">
        <Avatar size="lg" className="w-[45px] h-[45px]" />
        <div className="flex flex-col  ">
          <span>{format(user.username)}</span>
         { user.lastmessage?<span className="text-xs">last message:message</span>:(<span className="text-xs">{format(user.email)}</span>)}
        </div>
      </div>
    </>
  );
}
