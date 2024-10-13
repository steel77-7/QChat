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
  useSelect,
} from "@nextui-org/react";
import IndividualContactBox from "@/components/chat/chatComponents/IndividualContactBox";
import apiCall from "@/utils/apiCall";
import { useSelector } from "react-redux";
export default function ContactList({ contacts }: { contacts: any }) {
  //component states
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<any>(null);
  const user = useSelector((state:any)=>state.user.user)
  //fetching contacts of a user from the backend
  useEffect(() => {
    const fetchContactList = async () => {
      const { data,status } = await apiCall({
        url: "utils/fetch_contacts",
        method: "GET",
      });
      if(status===200){
      setContactList(data.contacts);
      console.log(data.contacts)}
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
           {/*  <IndividualContactBox /> */}
          </li>
          {contactList ? (
            contactList?.map((contact: any, index: any) => {
            
              if (search!==''&&contact.username.indexOf(search) > -1)
                return (
                  <li>
                    <IndividualContactBox key={index} contact={contact} />
                  </li>
                );
                else if(search===''){
                  return (
                    <li>
                      <IndividualContactBox key={index} contact={contact} />
                    </li>
                  );
                }
           
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
