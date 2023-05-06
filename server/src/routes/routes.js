import { Router } from "express"
import routerProducts from "./api/products.routes.js"
import routerUsers from "./api/users.routes.js"
import routerSessions from "./api/sessions.routes.js"
import routerCarts from "./api/carts.routes.js"
import routerMessages from "./api/messages.routes.js"
import routerOrders from "./api/order.routes.js"

const router = Router()

router.use('/api/products', routerProducts)
router.use('/api/users', routerUsers)
router.use('/api/sessions', routerSessions)
router.use('/api/carts', routerCarts)
router.use('/api/messages', routerMessages)
router.use('/api/orders', routerOrders)

export default router