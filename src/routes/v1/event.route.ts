import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import {eventController} from '@controllers/v1/event.controller'
export const eventRouter = Router();
eventRouter.get("/",passport.authenticate("jwt", { session: false }),eventController.getEvents);
eventRouter.post('/',passport.authenticate("jwt", { session: false }),eventController.createEvent)
