import { Router } from 'express'
import { passportError, authorizationRole } from '../../utils/authorization.js'

import { postCart, getCartById, getMyCart, getAllCarts, putProductOnCart, addProductOnCart, removeProductCart, deleteProductFromCart, deleteAllProductsFromCart } from '../../controllers/carts.js'

const routerCarts = Router()

routerCarts.post('/', postCart)
routerCarts.get('/', passportError('jwt'), authorizationRole('admin'), getAllCarts)
routerCarts.get('/cart/:id', passportError('jwt'), authorizationRole('admin'), getCartById)
routerCarts.get('/mycart/', passportError('jwt'), getMyCart)
routerCarts.put('/addproduct/', passportError('jwt'), addProductOnCart)
routerCarts.delete('/removeproduct/', passportError('jwt'), removeProductCart)
routerCarts.put('/:id', passportError('jwt'), deleteAllProductsFromCart)

// Old version only postman
routerCarts.put('/:id/product/:pid', putProductOnCart)
routerCarts.delete('/:id/product/:pid', deleteProductFromCart)

export default routerCarts