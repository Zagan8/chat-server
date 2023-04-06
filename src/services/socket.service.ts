import { Server, Socket } from "socket.io";
import messageService, { Message } from "./message.service";

const socketService = (io: Server) => {
  let activeUsers: { [name: string]: string } = {};
  io.on("connection", async (socket: Socket) => {
    socket.join("wow");

    socket.on("log_in", (name: string) => {
      activeUsers[socket.id] = name;
      sendActiveUsers();
    });

    const sendActiveUsers = () => {
      const users = Object.values(activeUsers);
      io.to("wow").emit("active_users", users);
      console.log(users);
    };

    socket.on("send_message", async (message: Message) => {
      const updatedMsgs = await messageService.getAll();
      socket.to("wow").emit("get_messages", updatedMsgs);
    });

    socket.on("disconnect", () => {
      delete activeUsers[socket.id];
      sendActiveUsers();
    });
  });
};

export default socketService;
