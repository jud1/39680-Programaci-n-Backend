import { Router } from 'express'
import { passportError, authorizationRole } from '../../utils/authorization.js'
import { getProducts, getPaginatedProducts, getProduct, postProduct, deleteProduct, updateProduct } from '../../controllers/products.js'

const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.get('/paginated/', getPaginatedProducts)
routerProducts.get('/:id', getProduct)
routerProducts.post('/', passportError('jwt'), authorizationRole('admin'), postProduct)
routerProducts.delete('/:id', passportError('jwt'), authorizationRole('admin'), deleteProduct)
routerProducts.put('/:id', passportError('jwt'), authorizationRole('admin'), updateProduct)

export default routerProducts