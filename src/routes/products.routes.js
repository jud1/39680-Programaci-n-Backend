import { Router } from "express"
import { getManagerProducts } from '../dao/daoManager.js'

/* const productos = new ProductManage('src/models/products.json')
const productsRouter = Router() */
const productsRouter = Router()

/* await productos.verifyStaticId() */

// (GET ALL) http://localhost:8080/api/productos
productsRouter.get('/', async (req, res) => {
   const data = await getManagerProducts()
   const managerproduct = new data.ProductDaoMongoDB
   const traidos = await managerproduct.getElements()

   console.log(traidos)

   res.send(traidos)

   /* // Generar peticion
   const aux = await productos.getProducts(req.query.limit)
   console.log(aux)
   
   // Socket io
   req.app.get('socketio').emit('getUpdtProds', aux) // Prueba para mostar por consola
   
   // Res default
   res.send(`Todos los productos`) */
})

// (GET ONE) http://localhost:8080/api/productos/1
productsRouter.get('/:pid', async (req, res) => {
   /* // Generar peticion
   console.log(await productos.getProductById(req.params.pid))
   
   // Res default
   res.send(`Obtener producto`) */
})

// (ADD ONE) http://localhost:8080/api/productos/ (body required)
productsRouter.post('/', async (req, res) => {
   /* // Generar peticion
   await productos.addProduct(req.body)
   
   // aux con la lista de productos actualizada
   const aux = await productos.getProducts(req.query.limit)

   // Socket io
   req.app.get('socketio').emit('getUpdtProds', aux) // emitir al agregar uno
   
   // Res default
   res.send(`Agregar producto`) */
})

// (UPDATE ONE) http://localhost:8080/api/productos/1 (body required)
productsRouter.put('/:pid', async (req, res) => {
   /* // Generar peticion
   await productos.updateProduct(req.params.pid, req.body)
   
   // Res default
   res.send(`Modificar producto`) */
})

// (DELETE ONE) http://localhost:8080/api/productos/1
productsRouter.delete('/:pid', async (req, res) => {
   /* // Generar peticion
   await productos.deleteProduct(Number(req.params.pid))
   
   // aux con la lista de productos actualizada
   const aux = await productos.getProducts(req.query.limit)

   // Socket io
   req.app.get('socketio').emit('getUpdtProds', aux) // emitir al eliminar uno
   
   // Res default
   res.send(`Eliminar producto`) */
})


export default productsRouter