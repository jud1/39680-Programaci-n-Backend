import { Router } from 'express'
import { passportError, authorizationRole } from '../../utils/authorization.js'

import { postCart, getCartById, getMyCart, getAllCarts, putProductOnCart, addProductOnCart, removeProductCart, deleteProductFromCart, deleteAllProductsFromCart } from '../../controllers/carts.js'

const routerCarts = Router()

/* Error en autentificación de ruta */
routerCarts.get('/', passportError('jwt'), authorizationRole('admin'), getAllCarts)

routerCarts.post('/', postCart)
routerCarts.get('/my-cart/', passportError('jwt'), getMyCart)
routerCarts.get('/find/:id', getCartById)
routerCarts.get('/', getAllCarts)
routerCarts.put('/:id/product/:pid', putProductOnCart)
routerCarts.delete('/:id/product/:pid', passportError('jwt'), deleteProductFromCart)
routerCarts.put('/addproduct/', passportError('jwt'), addProductOnCart)
routerCarts.delete('/removeproduct/', passportError('jwt'), removeProductCart)
routerCarts.put('/:id', passportError('jwt'), deleteAllProductsFromCart)

export default routerCarts