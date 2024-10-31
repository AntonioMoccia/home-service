import { config } from "dotenv";
config();
import express, { Application } from "express";

import cors from 'cors'

import passport from "passport";
import {
  ExtractJwt,
  Strategy as JwtStrategy,
  StrategyOptionsWithoutRequest,
} from "passport-jwt";
import UserService from "@v1/services/user.service";
import v1 from "@v1/routes";
import dataSource from "@v1/config/db";



dataSource.initialize().then(() => {
  console.log('connected database connection')
  dataSource.synchronize().then(() => {
    console.log('synchronized database connection')
    const app: Application = express();
    app.use(cors())
    app.use(express.json());
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


    app.use("/v1/api", v1);


    app.listen(5000, () => {
      console.log(`http://localhost:5000`);
    });
  })
})


