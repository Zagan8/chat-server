import { Server, Socket } from "socket.io";
import userService, { User } from "./user.service";
import messageService, { Message } from "./message.service";

const socketService = (io: Server) => {
  io.on("connection", async (socket: Socket) => {
    socket.join("wow");
    let messages;
    let users;
    socket.on("create_user", async (user: User) => {
      socket.join(user.room);
      await userService.create({
        name: user.name,
        socketId: socket.id,
        room: user.room,
      });
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
      await userService.deleteBySocketId(socket.id);
      socket.to("wow").emit("delete_user", socket.id);
    });
  });
};

export default socketService;
