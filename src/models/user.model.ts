import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: String,
        socketId: String
    },
    { versionKey: false, timestamps: true}
);
const UserModel = mongoose.model('User', userSchema);
export default UserModel;