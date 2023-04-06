import { Response, Request } from "express";
import messageService from "../services/message.service";

async function getAllMessages(req: Request, res: Response) {
  try {
    const messages = await messageService.getAll();
    res.send(messages);
  } catch (e) {
    console.error(`failed to get all messages with error ${e}`);
  }
}
async function createMessage(req: Request, res: Response) {
  try {
    const newMessage = await messageService.create(req.body.message);
    console.log(req.body);
    res.send(newMessage);
  } catch (e) {
    console.error(`failed to create message with error ${e}`);
  }
}

export { getAllMessages, createMessage };
