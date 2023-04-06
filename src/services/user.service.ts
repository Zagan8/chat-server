import UserModel from "../models/user.model";
import userModel from "../models/user.model";

export interface User {
  name: string;

  socketId: string;

  room: string;
}
const userService = {
  create: async (user: User) => {
    try {
      const newUser = await UserModel.create([user]);
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
  deleteBySocketId: async (socketId: string) => {
    try {
      await userModel.deleteOne({ socketId: socketId });
    } catch (e) {
      console.error(
        `failed to delete user with socketId:${socketId} with error ${e}`
      );
    }
  },
};

export default userService;
