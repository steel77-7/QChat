import dotenv from 'dotenv'
import express from "express";
import { createServer } from "http";
import connectToDb from "./db/db.js";
import { socketConnection } from "./socketServer.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
dotenv.config()
const app = express();
const httpServer = createServer(app);
const port = process.env.PORT;
const io = socketConnection(httpServer);

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials:true
  })
);
app.use(cookieParser());
app.use(express.json());
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.get('/',(req,res)=>{
  res.send(200).json({message:'hello'})
})

import user from "./routes/user.routes.js"
import utilities from "./routes/utility.routes.js"
import { redis_client } from '../utils/redisClient.js';
app.use('/api/user',user);
app.use('/api/utils',utilities);

connectToDb()
.then(() => {
  httpServer.listen(port, () => {
    console.log("Server listening on port :", port);
    socketConnection(httpServer)
    });
  }).then(()=> {
    redis_client();
  })
  .catch((err) => console.log("Server error", err));
