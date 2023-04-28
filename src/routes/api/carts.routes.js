import { Router } from 'express'
import { passportError, authorizationRole } from '../../utils/authorization.js'

import { postCart, getCartById, getAllCarts, putProductOnCart, deleteProductFromCart, deleteAllProductsFromCart } from '../../controllers/carts.js'

const routerCarts = Router()

routerCarts.get('/', passportError('jwt'), authorizationRole('admin'), getAllCarts)

routerCarts.post('/', postCart)
routerCarts.get('/:id', getCartById)
routerCarts.put('/:id/product/:pid', putProductOnCart)
routerCarts.delete('/:id/product/:pid', deleteProductFromCart)
routerCarts.put('/:id', deleteAllProductsFromCart)

export default routerCarts