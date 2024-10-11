import { getsocket } from "@/utils/gtesocket";
import { useEffect, useRef, useState } from "react";
const socket = getsocket()
export default function useSocket(){
const [isConnected, setIsConnected] = useState(socket.connected);

useEffect(() => {
  function onConnect() {
    setIsConnected(true);
    console.log('socket connected :',socket.id)
  }
  function onDisconnect() {
    setIsConnected(false);
  }
  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.emit('send-message','hello')
  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
  };
}, [socket]);

return socket;
}