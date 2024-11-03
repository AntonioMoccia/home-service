import { NextFunction, Request, Response } from "express";
import ServiceService from "@v1/services/service.service";

const serviceService = new ServiceService();

export const serviceControllerV1 = {
    createService: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const newService = await serviceService.createService(req.body);
            res.json(newService)
        } catch (e) {
            if (e instanceof Error) return res.status(400).json({ message: e.message })
        }
    },
    getAllServices: async (req: Request, res: Response, next: NextFunction) => {

        const service = await serviceService.getAllServices();

        console.log(req.user, 'user');
        res.json({
            service,
        });
    },
    getServiceByID: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const service = await serviceService.getServiceByID(req.params.id_service)
            res.json({
                service
            })
        } catch (error) {
            res.status(403).json({
                message: `Non esiste un servizio con l'ID ${req.params.id_service}`
            })
        }
    },
    deleteService: async (req: Request, res: Response, next: NextFunction) => {
        //per eliminare il servizio devo essere il creatore del servizio

        try {
            const deleteResult = await serviceService.deleteService(req.params.id_service, '') //da passare id user

            res.json({
                deleteResult
            })
        } catch (error) {
            if (error instanceof Error) return res.status(400).json({ message: error.message })
        }
    },
    updateService: async (req: Request, res: Response, next: NextFunction) => {

        const update = await serviceService.updateService(req.params.id_service, req.body)
        res.json({
            update
        })
    }

};
