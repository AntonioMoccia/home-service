import { NextFunction, Request, Response } from "express";
import ServiceService from "@v1/services/service.service";

const serviceService = new ServiceService();

export const serviceControllerV1 = {
    createService: async (req: Request, res: Response, next: NextFunction) => {
        const newUser = await serviceService.createService(req.body);
        res.json(newUser)
    },
    getAllServices: async (req: Request, res: Response, next: NextFunction) => {
        const service = await serviceService.getAllServices();

        res.json({
            service,
        });
    },
    deleteService: async (req: Request, res: Response, next: NextFunction) => {
        
        try {
            const deleteResult = await serviceService.deleteService(req.params.id_service)
            res.json({
                deleteResult
            })
        } catch (error) {
            res.status(400).json({
                message:'error on delete service'
            })
        }
    },
    updateService:async (req:Request,res:Response,next:NextFunction)=>{
        const update = await serviceService.updateService(req.params.id_service,req.body)

        res.json({
            update
        })
    }   
    
};
