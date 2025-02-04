import { Router } from 'express'


import { authRouter } from '@v1/routes/auth.route';
import { userRouter } from '@v1/routes/user.route';
import { jobRouterV1 } from './job.route';
import verifyToken from '@v1/middelwares/verifyToken';
const v1Router = Router()

v1Router.use("/auth", authRouter);
v1Router.use("/users", userRouter);
v1Router.use("/jobs", verifyToken, jobRouterV1);

export default v1Router