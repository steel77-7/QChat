import { useEffect, useMemo, useState } from "react";
import {
  Listbox,
  ListboxItem,
  Chip,
  ScrollShadow,
  Avatar,
  Selection,
  listboxItem,
  Input,
} from "@nextui-org/react";
import IndividualContactBox from "@/components/chat/chatComponents/IndividualContactBox";
import apiCall from "@/utils/apiCall";
export default function ContactList({ contacts }: { contacts: any }) {
  //component states
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<any>(null);
  //fetching contacts of a user from the backend
  useEffect(() => {
    const fetchContactList = async () => {
      const { data } = await apiCall({
        url: "contacts",
        method: "GET",
      });
      setContactList(data);
    };
    fetchContactList();
  }, []);

  return (
    <>
      <div className="flex flex-col  w-full border-r-2 border-white">
        <h1 className="bg-purple-800 rounded-tl-medium flex flex-col    p-3 h-[70px]">
          {" "}
          {/*   <div>Contacts{" "}</div> */}
          <Input
            size="sm"
            type="text"
            label="Find a converation"
            className="text-black"
            variant={`faded`}
            color="secondary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </h1>
        <ul className="flex flex-col  border-r-2 border-white">
          <li>
            <IndividualContactBox />
          </li>
          {!contactList === null ? (
            contactList?.map((contact: any, index: any) => {
              if (contact.name.toUpperCase().indexOf(search.toUpperCase()) > -1)
                return (
                  <li>
                    <IndividualContactBox key={index} />
                  </li>
                );
              return null;
            })
          ) : (
            <li>
              <div className=" p-6 border hover:border-zinc-200 duration-400 ease-in-out hover:bg-zinc-900 rounded-md">
                you dont have any friends
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
