import UserModel from "../models/user.model";
import mongoose, { Mongoose, ObjectId } from "mongoose";

export interface User {
  id?: string;
  name?: string;

  room?: string;
}
const userService = {
  create: async (user: User) => {
    try {
      const newUser = await UserModel.create(user);
      return newUser;
    } catch (e) {
      console.error(`failed to create user ${user} with error ${e}`);
    }
  },
  getAll: async () => {
    try {
      const users = await UserModel.find({});
      return users;
    } catch (e) {
      console.error(`filed bring all users with error :${e}`);
    }
  },
  deleteById: async (id: mongoose.Types.ObjectId) => {
    try {
      await UserModel.deleteOne({ _id: id });
    } catch (e) {
      console.error(`failed to delete user with id:${id} with error ${e}`);
    }
  },
};

export default userService;
