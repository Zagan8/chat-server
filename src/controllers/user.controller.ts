import { Response, Request } from "express";
import userService from "../services/user.service";

async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAll();
    res.send(users);
  } catch (e) {
    console.error(e);
  }
}

export { getAllUsers };
