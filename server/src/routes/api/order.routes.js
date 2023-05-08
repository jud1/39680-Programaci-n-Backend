import { Router } from 'express'
import { passportError, authorizationRole } from '../../utils/authorization.js'
import { postOrder, getOrder, putOrder } from '../../controllers/orders.controller.js'

const routerOrders = Router()

routerOrders.post('/', passportError('jwt'), postOrder)
routerOrders.get('/:id', passportError('jwt'),current('jwt'), getOrder)
routerOrders.put('/:id', passportError('jwt'), authorizationRole('admin'), putOrder)

export default routerOrders