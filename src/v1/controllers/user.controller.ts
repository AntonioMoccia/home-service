import { NextFunction, Request, Response } from "express";
import UserService from "@v1/services/user.service";

const userService = new UserService();

export const userControllerV1 = {
  createUser: async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await userService.create(req.body);
    res.json(newUser)
  },

  getAllUsers: async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAll();

    res.json({
      users,
    });
  },
  getByUsername: (req: Request, res: Response, next: NextFunction) => {
    return userService.findByUsername(req.query.username as string);
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    if(req.user.userId && req.user.userId == req.params.userId){
      const updatedUser = await userService.update(req.params.userId,req.body)
      return res.json({
        status:true,
        message:'User updated successfully',
        user:updatedUser
      })
    }
    res.json({
      status:false,
      message:'Il tuo id non combacia con quello che stai tentando di modificare'
    })
  },
  
};
