import { Avatar, User } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function IndividualContactBox({ contact }: any) {
  const user =useSelector((state:any)=>state.user.user.user)
  function format(str: string) {
    console.log('well well',str)
    if (str.length > 25) {
      return str.substring(0, 25) + "...";
    } else return str;
  }


 if(!contact.isGroupChat){
  console.log('yessss')
   let filteredMembers= contact.members.filter((m:any)=>m._id!==user._id)
   contact.name = filteredMembers[0].username
  console.log(contact)
  console.log(user)
 }


  return (
    <><Link to ={`${contact._id}`}>
      <div className="flex w-full flex-1 gap-3   hover:bg-zinc-900 border duration-200 border-transparent hover:border-zinc-200  p-4 px-8 my-2 rounded-md">
        <Avatar size="lg" className="w-[45px] h-[45px]" />
        <div className="flex flex-col  ">
          <span>{format(contact.name)}</span>
          {contact.lastmessage ? (
            <span className="text-xs">last message:message</span>
          ) : (
            <span className="text-xs">{format("heueirjebjbjjb")}</span>
          )}
        </div>
      </div>
      </Link>
    </>
  );
}
