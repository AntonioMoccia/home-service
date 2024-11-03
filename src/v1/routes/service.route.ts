import {Router} from 'express'
import { serviceControllerV1 } from '@v1/controllers/service.controller'

export const serviceRouter = Router()

serviceRouter.get('/',serviceControllerV1.getAllServices)
serviceRouter.get('/:id_service',serviceControllerV1.getServiceByID)
serviceRouter.post('/',serviceControllerV1.createService)
serviceRouter.delete('/:id_service',serviceControllerV1.deleteService)
serviceRouter.patch('/:id_service',serviceControllerV1.updateService)
