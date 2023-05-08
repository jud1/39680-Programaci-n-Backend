import { Router } from 'express'
import { current, authorizationRole } from '../../utils/authorization.js'

import { postCart, getCartById, getMyCart, getAllCarts, putProductOnCart, addProductOnCart, removeProductCart, deleteProductFromCart, deleteAllProductsFromCart } from '../../controllers/carts.js'

const routerCarts = Router()

routerCarts.post('/', postCart)
routerCarts.get('/', current('jwt'), authorizationRole('admin'), getAllCarts)
routerCarts.get('/cart/:id', current('jwt'), authorizationRole('admin'), getCartById)
routerCarts.get('/mycart/', current('jwt'), getMyCart)
routerCarts.put('/addproduct/', current('jwt'), addProductOnCart)
routerCarts.delete('/removeproduct/', current('jwt'), removeProductCart)
routerCarts.put('/:id', current('jwt'), deleteAllProductsFromCart)

// Old version only postman
routerCarts.put('/:id/product/:pid', putProductOnCart)
routerCarts.delete('/:id/product/:pid', deleteProductFromCart)

export default routerCarts