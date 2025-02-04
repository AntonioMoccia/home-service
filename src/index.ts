import { config } from "dotenv";
config();
import express, { Application } from "express";

import cors from 'cors'

import v1 from "@v1/routes";
import dataSource from "@v1/config/db";

import session from "express-session"

declare module 'express-session' {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
// Initialize client.
/* let redisClient = createClient()
redisClient.connect().catch(console.error)
 */
// Initialize store.
/* let redisStore = new RedisStore({
  client: redisClient,
  prefix: "sessions:",
}) */

// Initialize session storage.

declare module "express-serve-static-core" {
  export interface Request {
    user: {
      userId: string | undefined
    };
  }
}
dataSource.initialize().then(() => {
  console.log('connected database connection')
  dataSource.synchronize().then(() => {
    console.log('synchronized database connection')
    const app: Application = express();

    app.use(cors())
    app.use(express.json());

    app.use(
      session({
        resave: false, // required: force lightweight session keep alive (touch)
        saveUninitialized: false, // recommended: only save session when data exists
        secret: process.env.JWT_SECRET as string,
      }),
    )

    app.use("/v1/api", v1);

    app.listen(5000, () => {
      console.log(`http://localhost:5000`);
    });
  })
})


