import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Avatar, User } from "@nextui-org/react";
import React from "react";
import { useSelector } from "react-redux";

export default function ChatNav() {
  const currChat = useSelector((state: any) => state.currChat.currChat);
  const user = useSelector((state: any) => state.user.user.user);
console.log(user)
  let modifiedCurrChat = { ...currChat };

  if (modifiedCurrChat && !modifiedCurrChat.isGroupChat) {
    const filteredMembers = modifiedCurrChat.members.filter((m: any) => {
      console.log(m)
      m._id !== user._id;
    });
    console.log(filteredMembers)
    modifiedCurrChat.name = filteredMembers[0]?.username || "Unknown User";
  }

  console.log("currentchat::::::::::", modifiedCurrChat);

  return (
    <div className="flex flex-1 w-full h-[70px] shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600">
      <Navbar isBordered className="w-full p-3">
        <NavbarBrand className="flex items-center gap-4">
          <Avatar
            src={modifiedCurrChat.avatar || ""}
            alt={modifiedCurrChat.name}
            size="lg"
            color="secondary"
          />
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-white">
              {modifiedCurrChat.name || "John Doe"}
            </span>
            <span className="text-sm text-gray-300">
              {modifiedCurrChat.isGroupChat ? "Group Chat" : "Direct Message"}
            </span>
          </div>
        </NavbarBrand>

        <NavbarContent justify="end" className="gap-4 text-white items-center">
          <NavbarItem>
            <button
              className="p-2 rounded-full hover:bg-white hover:text-purple-800 transition-colors"
              aria-label="Options"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 110-1.5.75.75 0 010 1.5zm5.25 0a.75.75 0 110-1.5.75.75 0 010 1.5zm5.25 0a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
            </button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
