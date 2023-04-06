import UserModel from "../models/user.model";
import userModel from "../models/user.model";

const userService = {
  create: async (user: { name: string; socketId: string }) => {
    const newUser = await UserModel.create([user]);
    return newUser;
  },
  getAll: async () => {
    const users = await UserModel.find({});
    return users;
  },
  deleteBySocketId: async (socketId: string) => {
    const deletedUser = await userModel.deleteOne({ socketId: socketId });

    return deletedUser;
  },
};

export default userService;
