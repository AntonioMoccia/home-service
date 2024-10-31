import {Router} from 'express'


import { authRouter } from '@v1/routes/auth.route';
import { userRouter } from '@v1/routes/user.route';

const v1Router = Router()

v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
export default v1Router