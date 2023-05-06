import { Router } from 'express'
import { passportError } from '../../utils/authorization.js'
import { postOrder, getOrder, putOrder } from '../../controllers/orders.controller.js'

const routerOrders = Router()

routerOrders.post('/', postOrder)
// Para crear voy a recibir: 

/* 
   purcharser: desde el REQ.USER, id del usuario, 
   resume: desde el REQ.USER, cart_id, 
   amount: calculo del carro, desde el req.user - cart_id pido el carro actual desde el service
*/

routerOrders.get('/:id', getOrder)
routerOrders.put('/:id', putOrder)

export default routerOrders