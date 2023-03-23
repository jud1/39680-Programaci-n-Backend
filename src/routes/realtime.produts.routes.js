import { Router } from "express"
import { getManagerProducts } from '../dao/daoManager.js'

const realtimeProductsRouter = Router()

realtimeProductsRouter.get('/', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   const aux = await managerproducts.getElementsPaginate(req.query)
   console.log(aux)
   res.render("home", { 
      products: aux.docs.map(product => product.toJSON()),
      info: aux
   })
})

export default realtimeProductsRouter