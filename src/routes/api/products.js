import { Router } from "express"
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../../controllers/products.controller.js'

const productsRouter = Router()

productsRouter.get("/", getProducts)
productsRouter.get("/:id", getProduct)
productsRouter.post("/", createProduct)
productsRouter.put("/:id", updateProduct)
productsRouter.delete("/:id", deleteProduct)
 
export default productsRouter
