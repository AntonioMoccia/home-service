import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";
import {JwtPayload} from 'jsonwebtoken'

export type Models = Record<string, Model<any>>

export interface ControllerProps {
    req: Request,
    res: Response,
    next: NextFunction
}


export interface Payload extends JwtPayload{
    userId:string
}