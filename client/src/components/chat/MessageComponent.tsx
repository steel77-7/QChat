import { Avatar } from "@nextui-org/react";
import React from "react";

export default function MessageComponent() {
  return (
    <div className="flex items-start gap-4 hover:bg-zinc-800 rounded-lg m-2 p-3 transition-all duration-200 ease-in-out shadow-md">
      <Avatar size="lg" src="" className="w-[40px] h-[40px]" />
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-white">
          <b>{'kjvjhbjb'}</b>
        </span>
        <span className="text-sm text-gray-300">{'kjvhljv'}</span>
      {/*   {time && <span className="text-xs text-gray-500 mt-1">{time}</span>} */}
      </div>
    </div>
  );
}
