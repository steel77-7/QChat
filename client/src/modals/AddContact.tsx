import React, { useEffect, useState } from "react";
import { Input, Avatar, ScrollShadow } from "@nextui-org/react";
import apiCall from "@/utils/apiCall";
import IndividualContactBox from "@/components/chat/chatComponents/IndividualContactBox";
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

  return (
    <div className="flex flex-col w-full border-r-2 border-white h-full bg-purple-50 shadow-md">
      {/* Search bar */}
      <h1 className="bg-purple-800 rounded-tl-medium p-3 h-[70px] flex items-center justify-between">
        <Input
          size="sm"
          type="text"
          label="Search for a person"
          className="text-black w-full"
          variant="faded"
          color="secondary"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </h1>
      
      {/* Contact list */}
      <ScrollShadow>
        <ul className="flex flex-col overflow-y-auto h-full">
          {contactList && contactList.length > 0 ? (
            contactList.map((contact: any, index: any) => {
              if (search !== "" && contact.username.includes(search))
                return (
                  <li key={index}>
                    <IndividualRequestBox user={contact} />
                  </li>
                );
              else if (search === "") {
                return (
                  <li key={index}>
                    <IndividualRequestBox user={contact}  />
                  </li>
                );
              }
              return null;
            })
          ) : (
            <li>
              <div className="p-6 border hover:border-zinc-200 transition-all duration-400 ease-in-out hover:bg-zinc-900 rounded-md">
                No users found.
              </div>
            </li>
          )}
        </ul>
      </ScrollShadow>
    </div>
  );
}

function IndividualRequestBox({ user }: any) {
  async function sendRequest() {
    const { status } = await apiCall({
      url: "utils/send_request",
      method: "POST",
      reqData: { recipient: user._id },
    });
    if (status !== 200) {
      toast.error(`Request was not sent`);
      return;
    }
    toast.success(`Request sent to ${user.username}`);
  }

  return (
    <div
      className="flex w-full gap-4 items-center p-4 my-2 rounded-lg border transition-all duration-300 ease-in-out bg-white hover:bg-purple-600 hover:border-purple-400 active:bg-purple-700 cursor-pointer shadow-lg"
      onClick={sendRequest}
    >
      <Avatar size="lg" src="/default-avatar.png" className="w-[45px] h-[45px]" />
      <div className="flex flex-col justify-center">
        <span className="text-md font-semibold">{user.username}</span>
        <span className="text-sm text-gray-500">{user.email}</span>
      </div>
    </div>
  );
}
