import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Avatar, User } from "@nextui-org/react";
import React from "react";

export default function ChatNav() {
  return (
    <>
      <div className="flex flex-1 w-full h-[70px]">
        <Navbar className="bg-purple-800 w-full  ">
          <NavbarBrand>
            <User
              name="Jane Doe"
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
