import { setCurrChat } from "@/redux/reducers/currChat";
import { Avatar, User } from "@nextui-org/react";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export default function IndividualContactBox({ contact }: any) {
  const user = useSelector((state: any) => state.user.user.user);
  const location = useLocation();
  const currChatid = location.pathname.substring(1);
  const dispatch = useDispatch();

  function format(str: string) {
    if (str.length > 25) {
      return str.substring(0, 25) + "...";
    } else return str;
  }

  // Make a copy of the contact object if you need to modify it
  let modifiedContact = { ...contact };

  if (!modifiedContact.isGroupChat) {
    console.log("yessss");

    // Make a copy of members array
    let filteredMembers = modifiedContact.members.filter(
      (m: any) => m._id !== user._id
    );

    // Modify the copy, not the original object
    modifiedContact.name = filteredMembers[0].username;
    console.log("contact", modifiedContact);
    console.log(user);
  }

  async function handleClick() {
    dispatch(setCurrChat(modifiedContact)); // Dispatch the modified contact
    console.log("contact set");
  }

  return (
    <>
      <Link to={`${contact._id}`} onClick={handleClick}>
        <div
          className={`flex w-full flex-1 gap-4 items-center p-4 my-2 rounded-lg border 
          transition-all duration-300 ease-in-out bg-white hover:bg-purple-600 hover:border-purple-400 
          active:bg-purple-700 cursor-pointer shadow-lg 
          ${
            currChatid === contact._id
              ? "bg-purple-700 border-purple-400 text-white"
              : ""
          }`}
        >
          <Avatar
            src={contact.avatar || "/default-avatar.png"} // Use contact avatar or a fallback
            size="lg"
           
            color="secondary"
            className="w-[50px] h-[50px]"
          />
          <div className="flex flex-col justify-center">
            <span
              className={`text-md font-semibold ${
                currChatid === contact._id ? "text-white" : "text-black"
              }`}
            >
              {format(modifiedContact.name)}
            </span>
            <span
              className={`text-sm ${
                currChatid === contact._id ? "text-gray-300" : "text-gray-500"
              }`}
            >
              {modifiedContact.lastmessage
                ? `Last message: ${modifiedContact.lastmessage}`
                : format("No recent messages")}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
}
