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

// (ADD on CART) http://localhost:8080/api/carts/1/product/1
cartsRouter.put('/:cid/product/:pid', async (req, res) => {
   // Cart manager
   const dataCarts = await getManagerCarts()
   const managercarts = new dataCarts.ManagerCartsMongoDB

   // Products Manager
   const dataProducts = await getManagerProducts()
   const managerproducts = new dataProducts.ManagerProductsMongoDB
   
   // Aux variables
   const auxCart = await managercarts.getElementById(req.params.cid)
   const auxProduct = await managerproducts.getElementById(req.params.pid)

   // Generate new array to put (cart products list)
   const auxCartProducts = auxCart.products

   // If: product exixst on cart, add oen to count
   if(auxProduct && auxCartProducts.some(item => item.id === req.params.pid)){ 
      // map on all products on array
      const auxUpdateProducsCart = auxCartProducts.map(item => {
         // product match, add one
         item.id === req.params.pid ? item.quantity += 1 : false
         // return item on new array
         return item
      })
      // update new array on cart item
      await managercarts.updateElement(req.params.cid, {
         products: auxUpdateProducsCart
      })
   }
   // Else: doesn't exist, create
   else if(auxProduct) {
      // Create new element on cart w start count on 1
      auxCartProducts.push({ id: req.params.pid, quantity: 1 })
      // Put only the product array property of the object
      await managercarts.updateElement(req.params.cid, {
         products: auxCartProducts
      })
   }

   // Defaut res
   res.send('Product added to the cart')
})

export default cartsRouter