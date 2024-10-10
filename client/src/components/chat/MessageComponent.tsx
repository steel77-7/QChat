import { Avatar } from "@nextui-org/react";
import React from "react";

export default function MessageComponent() {
  return (
    <>
      <div className="flex gap-4 hover:bg-zinc-900 rounded-md m-2 p-2">
        <Avatar size="sm" />
        <div className="flex  flex-col">
          <span className="  opacity-65">
            <b>name</b>
          </span>
          <span>message</span>
        </div>
      </div>
    </>
  );
}
