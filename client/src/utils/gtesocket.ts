import io from "socket.io-client";

export const getsocket = () => {
  const socket = io(import.meta.env.VITE_SOCKET_URL);
  socket.connect();
  console.log()
  return socket;
};
