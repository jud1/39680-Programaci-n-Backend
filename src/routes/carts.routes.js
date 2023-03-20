import { Router } from "express"
import { getManagerCarts } from '../dao/daoManager.js'
import { getManagerProducts } from '../dao/daoManager.js'

const cartsRouter = Router()

// (GET ALL CART) http://localhost:8080/api/carts/
cartsRouter.get('/', async (req, res) => {
   const data = await getManagerCarts()
   const managercarts = new data.ManagerCartsMongoDB
   const aux = await managercarts.getElements()
   
   // Defaut res
   res.send(aux)
})

// (ADD CART) http://localhost:8080/api/carts
cartsRouter.post('/', async (req, res) => {
   const data = await getManagerCarts()
   const managercarts = new data.ManagerCartsMongoDB
   await managercarts.addElements()

   // Defaut res
   res.send('Cart created')
})

// (GET CART) http://localhost:8080/api/carts/1
cartsRouter.get('/:id', async (req, res) => {
   const data = await getManagerCarts()
   const managercarts = new data.ManagerCartsMongoDB
   const aux = await managercarts.getElementById(req.params.id)

   // Defaut res
   res.send(aux)
})

// (ADD on CART) http://localhost:8080/api/carts/1/product/1 updated to can be setted quantity
cartsRouter.put('/:cid/product/:pid', async (req, res) => {
   // Cart manager
   const dataCarts = await getManagerCarts()
   const managercarts = new dataCarts.ManagerCartsMongoDB

   // Product manager
   const dataProducts = await getManagerProducts()
   const managerproducts = new dataProducts.ManagerProductsMongoDB

   let cart = await managercarts.getElementById(req.params.cid)
   const quantityParam =  req.body.quantity

   const incomingProduct = await managerproducts.getElementById(req.params.pid)

   // Invalid product
   if (!incomingProduct) res.send('Invalid product')
   
   // If the product exist on cart already
   else if(incomingProduct && cart.products.some(item => item.product.toString() === incomingProduct.id)) {
      const productModify = cart.products.find(item => item.product.toString() === incomingProduct.id)
      productModify.quantity = quantityParam ? quantityParam : productModify.quantity + 1
      await managercarts.updateElement(req.params.cid, cart)
      res.send('Product quantity modify on the cart')
   }
   
   // Else the product is new on the cart
   else if(incomingProduct){
      const newProduct = { product: req.params.pid, quantity: quantityParam ? quantityParam : 1  }
      cart.products.push(newProduct)
      await managercarts.updateElement(req.params.cid, cart)
      res.send('Product added to the cart')
   }

})

// (DELETE PRODUCT OF CART)
cartsRouter.delete('/:cid/product/:pid', async (req, res) => {
   // Cart manager
   const dataCarts = await getManagerCarts()
   const managercarts = new dataCarts.ManagerCartsMongoDB

   // Aux for the original cart
   const aux = await managercarts.getElementById(req.params.cid)

   // aux for the filtered car without the product to delete
   const updateCart = aux.products.filter(item => item.product.toString() !== req.params.pid)

   // update de array products of cart
   await managercarts.updateElement(req.params.cid, { $set: { products: updateCart }})
   
   // Defaut res
   res.send('Product remove from the cart successful')
})

// (UPDATE A CART : CUSTOM)
cartsRouter.put('/:id', async (req, res) => {
   // Cart manager
   const dataCarts = await getManagerCarts()
   const managercarts = new dataCarts.ManagerCartsMongoDB

   await managercarts.updateElement(req.params.id, {$set: { products: req.body }}) // get a custom cart products array from req-body
   
   // Defaut res
   res.send('Cart update custom')
})

// (DELETE ALL PRODUCTS FROM CART)
cartsRouter.delete('/:id', async (req, res) => {
   // Cart manager
   const dataCarts = await getManagerCarts()
   const managercarts = new dataCarts.ManagerCartsMongoDB

   await managercarts.updateElement(req.params.id, {$set: { products: [] }})

   // Defaut res
   res.send('Cart is now empty')
})

export default cartsRouter