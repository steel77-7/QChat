import React, { useEffect, useState } from "react";
import Chat from "./Chat";
import Login from "./Login";
import apiCall from "@/utils/apiCall";

import { getuser } from "@/utils/getUser";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { setUser, setIsAuthenticated } from "@/redux/reducers/useSlice";
("framer-motion");
import { Spinner } from "@nextui-org/react";
import useSocket from "@/hooks/userSocket";
import { setSocket } from "@/redux/reducers/appDataSlice";

export default function ProtectedRoutes() {
  //global variables for this file
  const [loading, setLoading] = useState(true);
  const isauthenticated = useSelector(
    (state: any) => state.user.isAuthenticated
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //initializing the socketinstance
  dispatch(setSocket(useSocket()));

  //checking if the user is valid or not 
  useEffect(() => {
   // console.log(import.meta.env);
    const checkuser: any = async () => {
      const { data, status } = await getuser();
      console.log(data, status);
      if (status == 200) {
        dispatch(setIsAuthenticated(true));
        dispatch(setUser(data));
        setTimeout(() => {
          setLoading(false);
        }, 700);

        return;
      }
      if (status === 500 || status === 404) {
        return navigate("/login");
      }
      await checkuser();
    };

    checkuser();
  }, []);

  return loading ? (
    <div className="flex fixed justify-center w-full h-full">
      <Spinner
        label="Loading"
        color="secondary"
        labelColor="secondary"
        className="scale-[4]"
        size="sm"
      />
    </div>
  ) : isauthenticated ? (
    <div className="overflow-none fixed w-screen  h-screen">
      {" "}
      <Outlet />
    </div>
  ) : (
    <Navigate to={"/login"} />
  );

  //return isauthenticated ? <Outlet /> : <Login />;
}
