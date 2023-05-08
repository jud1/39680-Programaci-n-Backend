import { Router } from 'express'
import { current, authorizationRole, authUserOnGetOrder } from '../../utils/authorization.js'
import { postOrder, getOrder, putOrder } from '../../controllers/orders.controller.js'

const routerOrders = Router()

routerOrders.post('/', current('jwt'), postOrder)
routerOrders.get('/:id', authUserOnGetOrder('jwt'), getOrder)
routerOrders.put('/:id', current('jwt'), authorizationRole('admin'), putOrder)

export default routerOrders