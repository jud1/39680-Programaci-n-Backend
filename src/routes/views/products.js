import { Router } from "express"
import { managerProducts } from "../../helpers/managers.js"

const productsViewRouter = Router()

productsViewRouter.get('/', async (req, res) => {
   const aux = await managerProducts.getElementsPaginate(req.query)
   // console.log(aux)
   res.render("home", { 
      products: aux.docs.map(product => product.toJSON()),
      info: aux,
      session: req.session.uid ? req.session.uid : null
   })
})

export default productsViewRouter