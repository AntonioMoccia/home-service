import ServiceEntity from "@v1/entities/service.entity";
import dataSource from "@v1/config/db";
import { UpdateResult } from "typeorm";


const serviceRepository = dataSource.getRepository(ServiceEntity)
class Service{
    constructor(){}

    async getAllServices():Promise<ServiceEntity[]>{
        return await serviceRepository.find()
    }
    async getServiceByID(id_service:string):Promise<ServiceEntity | null>{
        return await serviceRepository.findOne({where:{id_service}})
    }

    async createService(service:Omit<ServiceEntity,'id_service'>) : Promise<ServiceEntity>{
        const newService = serviceRepository.create(service)

        return await serviceRepository.save(newService)

    }
    async updateService(service_id:string,serviceUpdate:Partial<ServiceEntity>):Promise<UpdateResult>{
        try {
            const update = await serviceRepository.update(service_id,serviceUpdate)
            return update
        } catch (error) {
            throw new Error('Qualcosa è andato storto nell`aggiornamento della risorsa')            
        }
    }

    async deleteService(service_id:string){
        return await serviceRepository.delete(service_id)
    }

}

export default Service