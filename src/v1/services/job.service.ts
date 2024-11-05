import JobEntity from "@v1/entities/job.entity";
import dataSource from "@v1/config/db";
import { User, UserRole } from "@v1/entities/user.entity";
import { UpdateResult } from "typeorm";


const jobRepository = dataSource.getRepository(JobEntity)
const userRepository = dataSource.getRepository(User)
class Job {
    constructor() { }

    async getAll(): Promise<JobEntity[]> {


        return await jobRepository.find({
            relations: {
                worker: true
            }
        })
    }
    async getByID(id_job: string): Promise<JobEntity | null> {
        return await jobRepository.findOne({ relations: { worker: true }, where: { id_job } })
    }
    async create(job: Omit<JobEntity, 'id_job'>): Promise<JobEntity> {

        //controllare se l'utente è un worker
        const user = await userRepository.findOne({
            where: {
                id: job.worker.id
            }
        })
        if (!user) {
            throw new Error(`L'utente non esiste nel database`)
        }
        if (user?.role !== UserRole.WORKER) {
            throw new Error(`Per creare un job l'utente deve essere un worker`)
        }

        const newJob = jobRepository.create(job)

        return await jobRepository.save(newJob)
    }
    async update(id_job: string, jobUpdate: Partial<JobEntity>): Promise<UpdateResult> {
        try {
            const update = await jobRepository.update(id_job, jobUpdate)
            return update
        } catch (error) {
            throw new Error('Qualcosa è andato storto nell`aggiornamento della risorsa')
        }
    }

    async delete(id_job: string, user_id: string) {
        try {
            const job = await jobRepository.findOne({ where: { id_job }, relations: { worker: true } })
            console.log(job?.worker.id, user_id);

            if (job?.worker.id == user_id) {

                return await jobRepository.delete(id_job)
            } else {
                throw new Error(`Job non trovato per l'utente ${user_id}`)
            }

        } catch (error) {
            throw new Error('Job inesistente')
        }
    }
    async getByUserID(user_id: string) {
        try {
            const user = await userRepository.findOne({ where: { id: user_id } })
            if (user) {
                const jobs = await jobRepository.findBy({ worker: user })
                return jobs
            } else {
                throw new Error('Questo utente non esiste')
            }
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message)
        }
    }

}

export default Job