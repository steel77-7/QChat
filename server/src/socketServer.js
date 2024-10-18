//const { Server } = require("socket.io");
import { Server } from "socket.io";

export const socketConnection = (httpServer) => {
  console.log("Socket server initialized");
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on("join-room", (room) => {
      console.log(room);
      socket.join(room);
      console.log(socket.rooms);
      socket.to(room).emit("recieve-message","sduyfgifg");
    });

    socket.on("send-message", (data) => {
      console.log("Received direct message:", data.chat);
      console.log("rooms:", socket.rooms);

      socket.to(data.chat).emit("recieve-message", data);
    });

    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });

    socket.on("connect_error", (err) => {
      console.log(`Connection error: ${err.message}`);
    });
  });
  return io;
};
