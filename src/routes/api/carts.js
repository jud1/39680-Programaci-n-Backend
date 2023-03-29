import { Router } from "express"
import { getCarts, createCart, getCart, addProductOnCart, deleteProductOnCart, updateCart, emptyCart } from "../../controllers/carts.controller.js"

const cartsRouter = Router()

cartsRouter.get('/', getCarts)
cartsRouter.post('/', createCart)
cartsRouter.get('/:id', getCart)
cartsRouter.put('/:cid/product/:pid', addProductOnCart)
cartsRouter.delete('/:cid/product/:pid', deleteProductOnCart)
cartsRouter.put('/:id', updateCart)
cartsRouter.delete('/:id', emptyCart)

export default cartsRouter