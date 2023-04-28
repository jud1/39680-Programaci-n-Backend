import { Router } from 'express'
import { getProducts, getPaginatedProducts, getProduct, postProduct, deleteProduct, updateProduct } from '../../controllers/products.js'

const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.get('/paginated/', getPaginatedProducts)
routerProducts.get('/:id', getProduct)
routerProducts.post('/', postProduct)
routerProducts.delete('/:id', deleteProduct)
routerProducts.put('/:id', updateProduct)

export default routerProducts