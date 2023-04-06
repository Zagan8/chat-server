import MessageModel from "../models/message.model";

export interface Message {
  author: string;
  text: string;
}

const messageService = {
  getAll: async () => {
    try {
      const messages = await MessageModel.find({});
      return messages;
    } catch (e) {
      console.error(`failed to find all messages with error ${e}`);
    }
  },
  create: async (messageData: Message) => {
    try {
      const message = await MessageModel.create(messageData);
      return message;
    } catch (e) {
      console.error(`failed to create message ${messageData}, with error ${e}`);
    }
  },
};

export default messageService;
