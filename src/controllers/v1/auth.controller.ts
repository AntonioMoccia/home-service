import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserService from "@services/v1/user.service";
import AuthService from '@services/v1/auth.service'
import jwt, { JwtPayload } from "jsonwebtoken";


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
      let returnedUser = {
        email: user.email,
        username: user.username
      };


      res.json({ message: "Logged in successfully", user: returnedUser, token });
    } catch (e) {
      console.log(e);
    }
  },
  forgetPassword: async (req: Request, res: Response) => {
    if (!req.body.email) {
      res.status(400).json({
        message: "passare una email valida"
      })
    }
    const user = await userService.findByEmail(req.body.email)


    if (!user) {
      res.status(404).json({
        message: "non esistono utenti con questa mail"
      })
      return
    }


    const JWT_SECRET = process.env.JWT_SECRET! + user?.password
    const token = jwt.sign({ userId: user?._id }, JWT_SECRET, { expiresIn: "2m" });

    console.log(`http://localhost:5173/reset-password/${user._id}/${token}`)

    res.status(200).json({
      message: "email sended succesfully"
    })
  },
  resetPassword: async (req: Request, res: Response) => {
    const {
      password,
      confirmPassword,
      userId,
      token
    } = req.body
console.log(    'hxhgfxjghfgxgfx',  password,
  confirmPassword,
  userId,
  token);

    const user = await userService.findById(userId)
    const JWT_SECRET = process.env.JWT_SECRET! + user?.password
    try {
      jwt.verify(token, JWT_SECRET)
      authService.updatePassword(userId, password).then(response => {
        res.json(response)
      }).catch((e) => {
        res.json(e)
      })
    } catch (error) {
      res.json(error)
    }
  },
  verifyToken: async (req: Request, res: Response) => {

    const user = await userService.findById(req.body.userId)
    const JWT_SECRET = process.env.JWT_SECRET! + user?.password

    try {
      jwt.verify(req.body.token, JWT_SECRET)
      res.json({
        isValid: true
      })
    } catch (error) {
      res.json({
        isValid: false
      })
    }

  }
};
