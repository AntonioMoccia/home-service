import { config } from "dotenv";
config();
import express, { Application, NextFunction, Request, Response } from "express";
import MongoDb from "@services/v1/mongo.service";
import { userRouter } from "@routes/v1/user.route";
import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import UserService from "@services/v1/user.service";
import { authRouter } from "@routes/v1/auth.route";
import { eventRouter } from "@routes/v1/event.route";

new MongoDb()
  .init()
  .then((res) => {
    console.log(res);

    const app: Application = express();

    const opts: StrategyOptionsWithoutRequest = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET as string,
    };

    const userService = new UserService();

    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await userService.findByUsername(jwt_payload.username);

        const returnedUser: Partial<typeof user> = user;

        delete returnedUser?.password;

        if (user) {
          return done(null, returnedUser);
        }

        return done(null, false);
      })
    );

    app.use(express.json());

    app.use("/v1/auth", authRouter);
    app.use("/v1/users", userRouter);
    app.use("/v1/events", eventRouter);

    app.listen(5000, () => {
      console.log(`http://localhost:5000`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
