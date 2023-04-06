import { Response, Request } from "express";
import messageService from "../services/message.service";
import socketService from "../services/socket.service";

async function getAllMessages(req: Request, res: Response) {
  try {
    const messages = await messageService.getAll();
    res.send(messages);
  } catch (e) {
    console.error(`failed to get all messages with error ${e}`);
    res.status(400);
  }
}
async function createMessage(req: Request, res: Response) {
  try {
    const newMessage = await messageService.create(req.body.message);

    socketService.sendMessage(newMessage?.toJSON());

    res.send(newMessage);
  } catch (e) {
    console.error(`failed to create message with error ${e}`);
    res.status(400);
  }
}

export { getAllMessages, createMessage };
