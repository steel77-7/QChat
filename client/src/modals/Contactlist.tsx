import { useEffect, useState } from "react";
import { Input, Avatar, ScrollShadow } from "@nextui-org/react";
import IndividualContactBox from "@/components/chat/chatComponents/IndividualContactBox";
import apiCall from "@/utils/apiCall";
import { useSelector } from "react-redux";

export default function ContactList({ contacts }: { contacts: any }) {
  const [search, setSearch] = useState("");
  const [contactList, setContactList] = useState<any>(null);
  const user = useSelector((state: any) => state.user.user);
const socket = useSelector((state:any)=>state.appData.socketInstance)
  // Fetch contacts from backend
  useEffect(() => {
    const fetchContactList = async () => {
      const { data, status } = await apiCall({
        url: "utils/fetch_contacts",
        method: "GET",
      });
      if (status === 200) {
        setContactList(data.contacts);
        console.log(data.contacts);
      }
    };
    fetchContactList();
  }, []);
//console.log(socket)
function  handleClick(room:any){
  console.log('clicked:::::::::::::')
  socket.emit('join-room',room)
}

  return (
    <div className="flex flex-col w-full border-r-2 border-white h-full bg-purple-50 shadow-md">
      {/* Search bar */}
      <h1 className="bg-purple-800 rounded-tl-medium p-3 h-[70px] flex items-center justify-between">
        <Input
          size="sm"
          type="text"
          label="Find a conversation"
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
          {contactList ? (
            contactList.map((contact: any, index: any) => {
             // console.log(contact)
              if (search !== "" && contact.name.indexOf(search)<-1)
                return (
                  <li key={index}  onClick={()=>handleClick(contact._id)}>
                    <IndividualContactBox contact={contact}  />
                  </li>
                );
              else if (search === "") {
                return (
                  <li key={index}  onClick={()=>handleClick(contact._id)}>
                    <IndividualContactBox contact={contact} />
                  </li>
                );
              }
              return null;
            })
          ) : (
            <li>
              <div className="p-6 border hover:border-zinc-200 transition-all duration-400 ease-in-out hover:bg-zinc-900 rounded-md">
                You don't have any friends.
              </div>
            </li>
          )}
        </ul>
      </ScrollShadow>
    </div>
  );
}
