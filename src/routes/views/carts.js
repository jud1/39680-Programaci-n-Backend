import { Router } from "express"
import { managerCarts, managerProducts } from "../../helpers/managers.js"

const cartsViewsRouter = Router()

cartsViewsRouter.get('/:id', async (req, res) => {
   const cart = await managerCarts.getElementById(req.params.id)
   
   // Populate
   try {
      const cartPopulate = await cart.populate('products.product')
      const auxPopulate = cartPopulate.products.map(product => product.toJSON())
      res.render("cartView", {
         products: auxPopulate, 
         cart: cartPopulate.id, 
         session: req.session.passport ? req.session.passport : null,
         isAdmin: (req.session.passport && req.session.passport.user && req.session.passport.user.role === 'admin') ? true : false
      })
   }
   catch(error) {
      res.send(error)
   }

})

export default cartsViewsRouter