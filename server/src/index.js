import dotenv from 'dotenv'
import express from "express";
import { createServer } from "http";
import connectToDb from "./db/db.js";
import { socketConnection } from "./socketServer.js";
import cors from 'cors'
dotenv.config()
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const io = socketConnection(httpServer);

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});


import user from "./routes/user.routes.js"
app.use('/api/user',user);

connectToDb()
  .then(() => {
    httpServer.listen(port, () => {
      console.log("Server listening on port :", port);
    });
  })
  .catch((err) => console.log("Server error", err));
