import { Router } from "express"
import { getManagerCarts } from '../dao/daoManager.js'
import { getManagerProducts } from '../dao/daoManager.js'

const cartsViewsRouter = Router()

cartsViewsRouter.get('/:id', async (req, res) => {
   const dataCarts = await getManagerCarts()
   const managercarts = new dataCarts.ManagerCartsMongoDB   
   
   const dataProducts = await getManagerProducts()
   const managerproducts = new dataProducts.ManagerProductsMongoDB   

   const cart = await managercarts.getElementById(req.params.id)
   
   // Populate
   try {
      const cartPopulate = await cart.populate('products.product') // Yes!
      const auxPopulate = cartPopulate.products.map(product => product.toJSON())
      // console.log(cartPopulate.id)
      res.render("cartView", {
         products: auxPopulate, 
         cart: cartPopulate.id, 
         session: req.session.uid ? req.session.uid : null
      })
   }
   catch(error) {
      res.send(error)
   }

})

export default cartsViewsRouter