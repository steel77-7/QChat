import axios from "axios";

const apiCall = async ({
  url,
  method,
  reqData = "",
  withCredentials = true,
}: {
  url: string;
  method: string;
  reqData?: any;
  withCredentials?: boolean;
}) => {
  /*  try {
    const response: any = await axios({
      method,
      url: "http://localhost:4000/api/" + url,
      data: reqData,
      withCredentials: withCredentials,
    });
    console.log(response)
    if (response.status === 401) {
      console.log(true)
      //logout if the status is something else
      if (!(await refreshToken())) {
        await logout();
      }
    }
    return { data: response.data.data, status: response.status };
  } catch (error: any) {
    console.error(error);
    return { data: error.response.data, status: error.status };
  } */
  try {
    const response: any = await axios({
      method,
      url: import.meta.env.VITE_SERVER_API + url,
      data: reqData,
      withCredentials: withCredentials,
    });
    console.log(response);
    /*  if (response.status === 401) {
      console.log(true)
      //logout if the status is something else
      if (!(await refreshToken())) {
        await logout();
      }
    } */
    return { data: response.data.data, status: response.status };
  } catch (error: any) {
    if (error.response.status === 401) {
      console.log(true);
      //logout if the status is something else
      if (!(await refreshToken())) {
        console.log("logout");
        await logout();
        return { data: error.response.data, status: 500 }
      }
    }
    console.error(error);
    return { data: error.response.data, status: error.status };
  }
};

export default apiCall;

export async function refreshToken() {
  const { status } = await apiCall({ url: "user/refreshToken", method: "GET" });
  return status === 200;
}

export async function logout() {
  const { status } = await apiCall({ url: "user/logout", method: "GET" });
  return status;
}

/* import axios from "axios";
import { refresh } from "./refreshToken";
import { logout } from "./logout";

const apiCall = async ({
  url,
  method,
  reqData = "",
    withCredentials=true
}: {
  url: string;
  method: string;
  reqData?: any;
  withCredentials?:boolean
}) => {
  try {
    const response = await axios({
      method,
      url: import.meta.env.VITE_SERVER_API + url,
      data: reqData,
      withCredentials: withCredentials,
    });
    if (response.status === 401) {
      await refresh();
    }
    return {data:response.data.data,status:response.status};
  } catch (error: any) {
    console.log(error)
    const data = error.response.data.data;
    if (error.response.status === 401) {
      const isRefreshed = await refresh();
      if(!isRefreshed){
        await logout()
        return {data,status:error.response.status}
      }
    }
    return {data,status:error.response.status}
  }
};

export default apiCall; */
