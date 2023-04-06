import http from "http";
import express from "express";
import { Server } from "socket.io";
import connectToMongoDb from "./services/mongo-db.service";
import cors from "cors";
import userService from "./services/user.service";
import socketService from "./services/socket.service";
import userRouter from "./routes/user.routes";
const app = express();
const server = http.createServer(app);

app.use(cors());
const wsServer = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use(userRouter);
connectToMongoDb().catch(console.error);
socketService(wsServer);
const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
