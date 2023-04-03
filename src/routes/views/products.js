import { Router } from "express"
import { managerProducts } from "../../helpers/managers.js"

const productsViewRouter = Router()

productsViewRouter.get('/', async (req, res) => {
   const aux = await managerProducts.getElementsPaginate(req.query)
   res.render("home", { 
      products: aux.docs.map(product => product.toJSON()),
      info: aux,
      session: req.session.passport ? req.session.passport : null,
      isAdmin: (req.session.passport && req.session.passport.user && req.session.passport.user.role === 'admin') ? true : false
   })
})

export default productsViewRouter