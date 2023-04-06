import http from "http";
import express from "express";
import { Server } from "socket.io";
import connectToMongoDb from "./services/mongo-db.service";
import cors from "cors";
import socketService from "./services/socket.service";
import messageRouter from "./routes/message.routes";
import bodyParser from "body-parser";

const bootstrap = async () => {
  const app = express();

  const server = http.createServer(app);

  app.use(bodyParser.json());

  await connectToMongoDb().catch(console.error);

  app.use(cors());

  const wsServer = await new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  app.use(messageRouter);

  socketService.init(wsServer);

  const port = 8000;

  server.listen(port, () => {
    console.log(`WebSocket server is running on port ${port}`);
  });
};

bootstrap();
