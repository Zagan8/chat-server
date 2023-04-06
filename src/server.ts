import http from "http";
import express from "express";
import { Server } from "socket.io";
import connectToMongoDb from "./services/mongo-db.service";
import messageService from "./services/message.service";
import cors from "cors";
import userService from "./services/user.service";
const app = express();
const server = http.createServer(app);

app.use(cors());
const wsServer = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.get("/", async (req, res) => {
  const users = await userService.getAll();
  res.json(users);
});
connectToMongoDb().catch(console.error);
wsServer.on("connection", async (socket) => {
  socket.join("wow");
  let messages;
  let users;
  socket.on("create_user", async (user) => {
    socket.join(user.room);
    await userService.create({ name: user.name, socketId: socket.id });
    messages = await messageService.getAll();
    users = await userService.getAll();
    socket.emit("receive_data", { messages: messages, users: users });
    socket
      .to(user.room)
      .emit("receive_data", { messages: messages, users: users });
  });
  socket.emit("onboarding", { messages: messages, users: users });

  socket.on(
    "send_message",
    async (message: { author: string; text: string }) => {
      socket.join("wow");
      await messageService.create(message);
      const updatedMsgs = await messageService.getAll();
      socket.to("wow").emit("get_messages", updatedMsgs);
      socket.emit("get_messages", updatedMsgs);
    }
  );
  socket.on("disconnect", async () => {
    await userService.deleteBySocketId(socket.id);
    socket.to("wow").emit("delete_user", socket.id);
  });
});

const port = 8000;
server.listen(port, () => {
  console.log(`WebSocket server is running on port ${port}`);
});
