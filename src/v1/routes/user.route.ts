import { Router } from "express";
import { userControllerV1 } from "@v1/controllers/user.controller";
import verifyToken from "@v1/middelwares/verifyToken";

export const userRouter = Router();


userRouter.get("/", userControllerV1.getAllUsers);
userRouter.post('/', userControllerV1.createUser)
userRouter.get("/username", userControllerV1.getByUsername);
userRouter.patch('/:userId', verifyToken, userControllerV1.update)