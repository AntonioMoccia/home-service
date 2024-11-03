import {Router} from 'express'
import { serviceControllerV1 } from '@v1/controllers/service.controller'
const serviceRouter = Router()

serviceRouter.get('/',serviceControllerV1.getAllServices)
serviceRouter.delete('/:id_service',serviceControllerV1.deleteService)
serviceRouter.post('/',serviceControllerV1.createService)
serviceRouter.patch('/:id_service',serviceControllerV1.updateService)