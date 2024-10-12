import { Avatar, Button } from "@nextui-org/react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import apiCall from "@/utils/apiCall";
import { toast } from "sonner";

export default function FriendRequest() {
  const [requestList, setRequestList] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const { data, status } = await apiCall({
        url: "utils/fetch_requests",
        method: "GET",
      });
      console.log(data)
      if (status !== 200) return;
      setRequestList(data.requests);
    })();
  }, []);
  return (
    <>
      <div className="flex gap-4">
        {" "}
        <Link to="/" >
        
            <FaArrowAltCircleLeft size={40} color="" />
         
        </Link>
        <h1 className="text-4xl mb-5">Friend requests</h1>
      </div>

      <ul className="flex flex-col w-full h-[90%] overflow-y-auto my-10">
        {requestList.length > 0 ? (
          requestList.map((request: any, index: number) => (
            <li>
              <IndividualRequestBox request={request} key={index} />
            </li>
          ))
        ) : (
          <p>No pending requests</p>
        )}
      </ul>
    </>
  );
}

const IndividualRequestBox = ({ request }: any) => {
  // sendin ga true or false response to the server to accept or to not accept the request along with the recipient of the req
  async function handleRequest(sendStatus: boolean) {
    const { status } = await apiCall({
      url: "hanlde_request",
      method: "POST",
      reqData: { sendStatus, recipient: request._id },
    });

    if (status !== 200) {
      toast.error("Server error");
      return;
    }
    toast(sendStatus ? "Request accepted" : "Request rejected");
  }
  return (
    <>
      <div className="flex flex-col w-[90%] gap-5 mx-auto mt-4 ">
        <hr className="bg-white w-full opacity-70" />
        <div className="flex w-full h-[100px] border border-white rounded-md items-center p-4 justify-between hover:bg-zinc-900 duration-300 hover:scale-105 ease-soft-spring">
          <div className="flex items-center gap-4">
            {" "}
            <Avatar size="lg" className="" />
            <h1>
              <b>Username</b>
            </h1>
          </div>
          <div className="flex gap-2">
            <Button color="success" onClick={() => handleRequest(true)}>
              <TiTick size={50} />
            </Button>
            <Button color="danger" onClick={() => handleRequest(false)}>
              <ImCross size={20} />
            </Button>
          </div>
        </div>
        <hr className="bg-white w-full opacity-70" />
      </div>
    </>
  );
};
