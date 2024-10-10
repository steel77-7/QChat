import apiCall from "./apiCall";

export const getuser = async () => {
  try {
    const { data, status } = await apiCall({
      url: "user/getUser",
      method: "GET",
    });

    return { data, status };
  } catch (error: any) {
    return { status: 401 };
  }
};
