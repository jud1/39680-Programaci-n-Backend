import { Router } from 'express'
import { current, authorizationRole } from '../../utils/authorization.js'
import { getProducts, getPaginatedProducts, getProduct, postProduct, deleteProduct, updateProduct } from '../../controllers/products.js'

const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.get('/paginated/', getPaginatedProducts)
routerProducts.get('/:id', getProduct)
routerProducts.post('/', current('jwt'), authorizationRole('admin'), postProduct)
routerProducts.delete('/:id', current('jwt'), authorizationRole('admin'), deleteProduct)
routerProducts.put('/:id', current('jwt'), authorizationRole('admin'), updateProduct)

export default routerProducts