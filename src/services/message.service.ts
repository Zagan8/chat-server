import MessageModel from "../models/message.model";

export interface Message {
  author: string;
  text: string;
}

const messageService = {
  getAll: async () => {
    const messages = await MessageModel.find();

    return messages;
  },
  create: async (messageData: Message) => {
    const message = await MessageModel.create(messageData);

    return message;
  },
};

export default messageService;
