import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: String,
    room: String,
  },
  { versionKey: false, timestamps: true }
);
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
