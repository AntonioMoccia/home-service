import { Router } from 'express'
import { authController } from '@v1/controllers/auth.controller'

export const authRouter = Router()

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/forgot-password", authController.forgetPassword);
authRouter.post("/verify-token", authController.verifyToken);
authRouter.post("/reset-password", authController.resetPassword);
authRouter.post('/verify-username', authController.verifyUsername)
