import express from "express";
import { getAllUsers } from "../controllers/user.controller";
const userRouter = express.Router();
const routePrefix = "/user";
userRouter.get(routePrefix, getAllUsers);

export default userRouter;
