import express from "express";
import {
  createMessage,
  getAllMessages,
} from "../controllers/message.controller";

const messageRouter = express.Router();
const routePrefix = "/message";

messageRouter.get(routePrefix, getAllMessages);
messageRouter.post(routePrefix, createMessage);

export default messageRouter;
