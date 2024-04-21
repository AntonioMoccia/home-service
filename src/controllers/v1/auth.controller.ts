import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserService from "@services/v1/user.service";
import AuthService from '@services/v1/auth.service'
import jwt from "jsonwebtoken";


const userService = new UserService();
const authService = new AuthService()

export const authController = {
  register: async (req: Request, res: Response) => {
    try {
      const { username, password, email } = req.body;

      const newUser = await authService.register({
        username,
        password,
        email
      })

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (e) {
      //console.log(e.message);
    }
  },
  login: async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      const user = await userService.findByUsername(username);

      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const passwordMatch = await bcrypt.compare(password, user?.password);

      if (!passwordMatch) {
        return res
          .status(400)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      res.json({ message: "Logged in successfully", token });
    } catch (e) {
      console.log(e);
    }
  },
};
