import { NextFunction, Request, Response } from "express";
import UserService from "@v1/services/user.service";
import { UserRole } from "@v1/entities/user.entity";
import Job from "@v1/services/job.service";

const jobService = new Job();
const userService = new UserService()

export const jobControllerV1 = {
    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!req.user || !req.user.userId) {
                return res.status(400).json({ message: 'Utente non registrato' })
            }
            const newJobObj = {
                ...req.body, //fare il dto
                worker: req.user.userId
            }

            // const user = await userService.findById(req.user.userId)

            /*       if(user?.role!==UserRole.WORKER){
                      return res.status(400).json({ message:`Per creare un job l'utente deve essere registrato come worker` })
                  }
           */

            const newJob = await jobService.create(newJobObj);
            res.json(newJob)
        } catch (e) {
            if (e instanceof Error) return res.status(400).json({ message: e.message })
        }
    },
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        const jobs = await jobService.getAll();
        if (Object.keys(req.query).length > 0) {
            console.log(req.query)
        }
        res.json({ jobs });
    },
    getByID: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const job = await jobService.getByID(req.params.id_job)
            res.json({
                job
            })
        } catch (error) {
            res.status(403).json({
                message: `Non esiste un job con l'ID ${req.params.id_service}`
            })
        }
    },
    delete: async (req: Request, res: Response, next: NextFunction) => {
        //per eliminare il servizio devo essere il creatore del servizio
        if (!req.user.userId) {
            return res.status(400).json({ message: 'Non esiste nessun servizio con questo codice associato a questo utente' })
        }
        try {
            const deleteResult = await jobService.delete(req.params.id_job, req.user.userId as string) //da passare id user

            res.json({
                deleteResult
            })
        } catch (error) {
            if (error instanceof Error) return res.status(400).json({ message: error.message })
        }
    },
    update: async (req: Request, res: Response, next: NextFunction) => {

        const update = await jobService.update(req.params.id_job, req.body)
        res.json({
            update
        })
    }
};
