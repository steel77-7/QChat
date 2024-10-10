import React, { useState } from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Selection,
} from "@nextui-org/react";
import ContactList from "@/modals/Contactlist";
import AddContact from "@/modals/AddContact";
export default function ContactArea() {

  const [addMemberPress,setAddMemberPress] =useState (true)
  return <>
  <div className="flex max-w-[300px] w-full max-h-full h-full">

  {!addMemberPress?<ContactList contacts={null}/>:<AddContact/>}
  </div>
  </>;
}
