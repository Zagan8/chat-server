import MessageModel from "../models/message.model";

const messageService = {
    getAll: async ()=>{
        const messages = await MessageModel.find({});
        return messages;
    },
    create : async (messageData:{author:string,text:string}) =>{
        const message = await MessageModel.create([messageData]);
        return message;
    }
}

export default messageService;