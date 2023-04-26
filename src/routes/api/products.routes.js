import { Router } from 'express'
import { getProducts, getProduct, postProduct, deleteProduct, updateProduct } from '../../controllers/products.js'

const routerProducts = Router()

routerProducts.get('/', getProducts)
routerProducts.get('/:id', getProduct)
routerProducts.post('/', postProduct)
routerProducts.delete('/:id', deleteProduct)
routerProducts.put('/:id', updateProduct)

export default routerProducts