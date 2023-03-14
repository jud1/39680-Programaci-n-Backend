import { Router } from "express"
import { getManagerProducts } from '../dao/daoManager.js'

const productsRouter = Router()

// (GET ALL) http://localhost:8080/api/productos
productsRouter.get('/', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   const aux = await managerproducts.getElements()
   
   // Defaut res
   res.send(aux)
})

// (GET ONE) http://localhost:8080/api/productos/1
productsRouter.get('/:id', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   const aux = await managerproducts.getElementById(req.params.id)
   
   // Defaut res
   res.send(aux)
})

// (ADD ONE) http://localhost:8080/api/productos/ (body required)
productsRouter.post('/', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   await managerproducts.addElements(req.body)

   // Socket io
   const aux = await managerproducts.getElements()
   req.app.get('socketio').emit('getUpdtProds', aux.map(product => product.toJSON()) )

   // Defaut res
   res.send(`element added: ${JSON.stringify(req.body)}`)
})

// (UPDATE ONE) http://localhost:8080/api/productos/1 (body required)
productsRouter.put('/:id', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   const idParam = req.params.id
   await managerproducts.updateElement(idParam, req.body)

   // Socket io
   const aux = await managerproducts.getElements()
   req.app.get('socketio').emit('getUpdtProds', aux.map(product => product.toJSON()))

   // Defaut res
   res.send(`Product ${idParam} was modify`)
})

// (DELETE ONE) http://localhost:8080/api/productos/1
productsRouter.delete('/:id', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   await managerproducts.deleteElement(req.params.id)

   // Socket io
   const aux = await managerproducts.getElements()
   req.app.get('socketio').emit('getUpdtProds', aux.map(product => product.toJSON()))

   // Defaut res
   res.send(`Product ${req.params.id} was deleted`)
})


export default productsRouter