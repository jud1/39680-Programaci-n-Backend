import { Router } from "express"
import { getManagerProducts } from '../dao/daoManager.js'

const realtimeProductsRouter = Router()

realtimeProductsRouter.get('/', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   const aux = await managerproducts.getElements()
   const jsonAux = JSON.parse(JSON.stringify(aux))
   res.render("home", {products: aux.map(product => product.toJSON())} /* {  } */)
})
realtimeProductsRouter.get('/realTimeProducts', async (req, res) => {
   const data = await getManagerProducts()
   const managerproducts = new data.ManagerProductsMongoDB
   const aux = await managerproducts.getElements()
   const jsonAux = JSON.parse(JSON.stringify(aux))
   res.render("realTimeProducts", {products: aux.map(product => product.toJSON())} /* { products: aux.map(product => product.toJSON()) } */)
})

export default realtimeProductsRouter