import { Server, Socket } from "socket.io";
import userService from "./user.service";
import messageService, { Message } from "./message.service";
import UserModel from "../models/user.model";

const socketService = (io: Server) => {
  let currentUsers: any[] = [];
  io.on("connection", async (socket: Socket) => {
    socket.join("wow");
    let messages;
    let users;
    socket.on("create_user", async (user) => {
      socket.join(user.room);
      const newUser = new UserModel({
        name: user.name,
        room: user.room,
      });
      await newUser
        .save()
        .then((user) =>
          currentUsers.push({ userId: user._id, socketId: socket.id })
        );
      messages = await messageService.getAll();
      users = await userService.getAll();
      socket.emit("receive_data", { messages: messages, users: users });
      socket
        .to(user.room)
        .emit("receive_data", { messages: messages, users: users });
    });
    socket.emit("onboarding", { messages: messages, users: users });

    socket.on("send_message", async (message: Message) => {
      socket.join("wow");
      await messageService.create(message);
      const updatedMsgs = await messageService.getAll();
      socket.to("wow").emit("get_messages", updatedMsgs);
      socket.emit("get_messages", updatedMsgs);
    });
    socket.on("disconnect", async () => {
      const currentUser = currentUsers.find(
        (user) => user.socketId === socket.id
      );
      if (currentUser) {
        await userService.deleteById(currentUser.userId);
        socket.to("wow").emit("delete_user", currentUser.userId);
      }
    });
  });
};

export default socketService;
