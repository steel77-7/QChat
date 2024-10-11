import { Avatar, Button } from "@nextui-org/react";
import React from "react";
import { TiTick } from "react-icons/ti";
export default function FriendRequest() {
  return (
    <>
      <div className="flex flex-col w-full h-[90%] overflow-y-auto mb-10">
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
        <IndividualRequestBox />
      </div>
    </>
  );
}

import { ImCross } from "react-icons/im";
const IndividualRequestBox = () => {
  return (
    <>
      <div className="flex flex-col w-[90%] gap-5 mx-auto mt-4 ">
        <hr className="bg-white w-full opacity-70" />
        <div className="flex w-full h-[100px] border border-white rounded-md items-center p-4 justify-between hover:bg-zinc-900 duration-300 hover:scale-105">
          <div className="flex items-center gap-4">
            {" "}
            <Avatar size="lg" className="" />
            <h1>
              <b>USername</b>
            </h1>
          </div>
          <div className="flex gap-2">
            <Button color="success"><TiTick size={50} /></Button>
            <Button color="danger"><ImCross size={20}/></Button>
          </div>
        </div>
        <hr className="bg-white w-full opacity-70" />
      </div>
    </>
  );
};
