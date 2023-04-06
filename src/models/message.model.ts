import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        author: String,
        text: String
    },
    { versionKey: false, timestamps: true}
);
const MessageModel = mongoose.model('Message', messageSchema);
export default MessageModel;