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

  const user = useSelector((state:any)=>state.user.user)
  return (
    <>
      <div className="flex flex-1 w-full h-[70px]">
        <Navbar className="bg-purple-800 w-full  ">
          <NavbarBrand>
            <User
              name={user.user.username}
              description="Product Designer"
              avatarProps={{
                src: '',
              }}
            />
            {/* the user profile */}
          </NavbarBrand>

          <NavbarContent>
            <NavbarItem>options(three dots ...)</NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
    </>
  );
}
