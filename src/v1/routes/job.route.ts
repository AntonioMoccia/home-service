import {Router} from 'express'
import { jobControllerV1 } from '@v1/controllers/job.controller'

export const jobRouterV1 = Router()

jobRouterV1.get('/',jobControllerV1.getAll)
jobRouterV1.get('/:id_job',jobControllerV1.getByID)
jobRouterV1.post('/',jobControllerV1.create)
jobRouterV1.delete('/:id_job',jobControllerV1.delete)
jobRouterV1.patch('/:id_job',jobControllerV1.update)
