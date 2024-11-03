import ServiceEntity from "@v1/entities/service.entity";
import dataSource from "@v1/config/db";
import { User, UserRole } from "@v1/entities/user.entity";
import { UpdateResult } from "typeorm";


const serviceRepository = dataSource.getRepository(ServiceEntity)
const userRepository = dataSource.getRepository(User)
class Service {
    constructor() { }

    async getAllServices(): Promise<ServiceEntity[]> {
        return await serviceRepository.find({
            relations: {
                worker: true
            }
        })
    }
    async getServiceByID(id_service: string): Promise<ServiceEntity | null> {
        return await serviceRepository.findOne({ relations: { worker: true }, where: { id_service } })
    }
    async createService(service: Omit<ServiceEntity, 'id_service'>): Promise<ServiceEntity> {

        //controllare se l'utente è un worker
        const user = await userRepository.findOne({
            where: {
                id: service.worker.id
            }
        })
        if (!user) {
            throw new Error(`L'utente non esiste nel database`)
        }
        if (user?.role !== UserRole.WORKER) {
            throw new Error(`Per creare un servizio l'utente deve essere un worker`)
        }

        const newService = serviceRepository.create(service)

        return await serviceRepository.save(newService)
    }
    async updateService(service_id: string, serviceUpdate: Partial<ServiceEntity>): Promise<UpdateResult> {
        try {
            const update = await serviceRepository.update(service_id, serviceUpdate)
            return update
        } catch (error) {
            throw new Error('Qualcosa è andato storto nell`aggiornamento della risorsa')
        }
    }

    async deleteService(id_service: string,user_id:string) {
        try {
            const service = await serviceRepository.findOne({where:{id_service},relations:{worker:true}})
            console.log(service?.worker.id,user_id);
            
            if(service?.worker.id == user_id){
                console.log('jkhsdgvfjhgasdvf');
                
                return await serviceRepository.delete(id_service)
            }else{
                throw new Error(`Servizio non trovato per l'utente ${user_id}`)
            }
            
        } catch (error) {
            throw new Error('servizio inesistente')
        }
    }

}

export default Service