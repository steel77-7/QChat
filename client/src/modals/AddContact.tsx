import IndividualContactBox from "@/components/chat/chatComponents/IndividualContactBox";
import apiCall from "@/utils/apiCall";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddContact() {
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<any>(null);

  useEffect(() => {
    const fetchContactList = async () => {
      const { data, status } = await apiCall({
        url: "utils/all_contacts",
        method: "GET",
      });
      if (status === 200) setContactList(data);
    };
    fetchContactList();
  }, []);

  useEffect(() => {
    console.log("contact list:", contactList);
  }, [contactList]);

  return (
    <>
      <div className="flex flex-col  w-full border-r-2 border-white">
        <h1 className="bg-purple-800 rounded-tl-medium flex flex-col    p-3 h-[70px]">
          {" "}
          {/*   <div>Contacts{" "}</div> */}
          <Input
            size="sm"
            type="text"
            label="Search for a person"
            className="text-black"
            variant={`faded`}
            color="secondary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </h1>
        <ul className="flex flex-col  border-r-2 border-white">
          {contactList && contactList !== null ? (
            contactList?.map((contact: any, index: any) => {
              if (search !== "" && contact.username.indexOf(search) > -1)
                return (
                  <li>
                    <IndividualContactBox key={index} user={contact} />
                  </li>
                );
              else if (search === "") {
                return (
                  <li>
                    <IndividualRequestBox key={index} user={contact} />
                  </li>
                );
              }

              return null;
            })
          ) : (
            <li>
              <div className="p-6 border hover:border-zinc-200 duration-400 ease-in-out hover:bg-zinc-900 rounded-md">
                No users found
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

function IndividualRequestBox({ user }: any) {
  console.log(user._id)
  function format(str: string) {
    if (str.length > 25) {
      return str.substring(0, 25) + "...";
    } else return str;
  }

  async function sendRequest() {
    const { status } = await apiCall({
      url: "utils/send_request",
      method: "POST",
      reqData: { recipient: user._id },
    });
    if (status !== 200) {
      toast.success(`Request was not sent`);
      return;
    }
    toast.success(`Request send to ${user.username}`);
  }

  return (
    <>
      <div
        className="flex w-full flex-1 gap-3   hover:bg-zinc-900 border duration-200 border-transparent hover:border-zinc-200  p-4 px-8 my-2 rounded-md"
        onClick={sendRequest}
      >
        <Avatar size="lg" className="w-[45px] h-[45px]" />
        <div className="flex flex-col  ">
          <span>{format(user.username)}</span>
          {user.lastmessage ? (
            <span className="text-xs">last message:message</span>
          ) : (
            <span className="text-xs">{format(user.email)}</span>
          )}
        </div>
      </div>
    </>
  );
}
