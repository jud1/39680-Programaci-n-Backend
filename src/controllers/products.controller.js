import { managerProducts } from "../helpers/managers.js"

const getProducts = async (req, res) => {
   res.send(await managerProducts.getElementsPaginate(req.query))
}

const getProduct = async (req, res) => {
   res.send(await managerProducts.getElementById(req.params.id))
}

const createProduct = async (req, res) => {
   // Create
   await managerProducts.addElements(req.body)
   
   // Socket io
   const auxSocket = await managerProducts.getElements()
   req.app.get('socketio').emit('getUpdtProds', auxSocket.map(product => product.toJSON()))

   // Defaut res
   res.send('Product created')
}

const updateProduct = async (req, res) => {
   // Update
   await managerProducts.updateElement(req.params.id, req.body)

   // Socket io
   const auxSocket = await managerProducts.getElements()
   req.app.get('socketio').emit('getUpdtProds', auxSocket.map(product => product.toJSON()))
   
   // Defaut res
   res.send(`Product ${req.params.id} was modify`)
}

const deleteProduct = async (req, res) => {
   // Delete
   await managerProducts.deleteElement(req.params.id)

   // Socket io
   const auxSocket = await managerProducts.getElements()
   req.app.get('socketio').emit('getUpdtProds', auxSocket.map(product => product.toJSON()))

   // Defaut res
   res.send(`Product ${req.params.id} was deleted`)
}

export { getProducts, getProduct, createProduct, updateProduct, deleteProduct }