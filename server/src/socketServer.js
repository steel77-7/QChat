//const { Server } = require("socket.io");
import { Server } from "socket.io";


export const socketConnection = (httpServer) => {
  console.log("Socket server initialized");
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST","PATCH"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected", socket.id);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`Joined room: ${room}`);
      console.log(`Roooms: `,socket.rooms);
    });


    //might come in handly later
   /*  socket.on("send-message", (message) => {
      console.log("Received direct message:", message);
      console.log("rooms:", socket.rooms);
      //socket.to(message.chat._id).emit("recieve-message", message);
      socket.to(message.chat).emit("recieve-message", message);
    }); */


    socket.on("disconnect", (reason) => {
      console.log(`Socket disconnected: ${reason}`);
    });

    socket.on("connect_error", (err) => {
      console.log(`Connection error: ${err.message}`);
    });
  });
  return io;
};


