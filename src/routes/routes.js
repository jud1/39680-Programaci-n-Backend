import { Router } from "express"
import routerProducts from "./api/products.routes.js"
import routerUsers from "./api/users.routes.js"
import routerSessions from "./api/sessions.routes.js"
import routerCarts from "./api/carts.routes.js"

const router = Router()

router.use('/api/products', routerProducts)
router.use('/api/users', routerUsers)
router.use('/api/sessions', routerSessions)
router.use('/api/carts', routerCarts)

export default router