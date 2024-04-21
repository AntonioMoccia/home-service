import { NextFunction, Request, Response } from "express";
import { Model } from "mongoose";


export type Models = Record<string,Model<any>>

export interface ControllerProps{
    req:Request,
    res:Response,
    next:NextFunction
}