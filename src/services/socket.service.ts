import { Server, Socket } from "socket.io";

class SocketService {
  private _io: Server;
  private activeUsers: { [name: string]: string } = {};

  init(io: Server) {
    this._io = io;

    this.attachEvents();
  }

  sendMessage(data: any) {
    this._io.emit("send_message", data);
  }

  sendActiveUsers() {
    const users = Object.values(this.activeUsers);

    this._io.to("wow").emit("active_users", users);
  }

  attachEvents() {
    this._io.on("connection", async (socket: Socket) => {
      socket.join("wow");

      socket.on("log_in", (name: string) => {
        this.activeUsers[socket.id] = name;

        this.sendActiveUsers();
      });

      socket.on("disconnect", () => {
        delete this.activeUsers[socket.id];

        this.sendActiveUsers();
      });
    });
  }
}

const socketService = new SocketService();

export default socketService;
