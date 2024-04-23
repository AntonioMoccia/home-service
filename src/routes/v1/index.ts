import {Router} from 'express'


import { authRouter } from '@routes/v1/auth.route';
import { userRouter } from '@routes/v1/user.route';
import { eventRouter } from '@routes/v1/event.route';

const v1Router = Router()

v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/events", eventRouter);

export default v1Router