import { Router } from "express"
import { getManagerMessages } from "../dao/daoManager.js"

const chatRouter = Router()

chatRouter.get('/', async (req, res) => {
   res.render("chat" /* { products: aux.map(product => product.toJSON()) } */)
})

export default chatRouter