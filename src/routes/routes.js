import { Router } from "express"
// Api routes
import productsRouter from "./api/products.js"
import cartsRouter from "./api/carts.js"
import usersRouter from "./api/users.js"
import sessionsRouter from "./api/sessions.js"
import uploadsRouter from "./api/uploads.js"
// Views routes
import productsViewRouter from "./views/products.js"
import cartsViewsRouter from "./views/carts.js"
import chatViewRouter from "./views/chat.js"
import usersViewsRouter from "./views/users.js"
import sessionViewsRouter from "./views/sessions.js"

const router = Router()

// Api routes
router.use('/api/products', productsRouter)
router.use('/api/carts', cartsRouter)
router.use('/api/users', usersRouter)
router.use('/api/sessions', sessionsRouter)
router.use('/api/uploads', uploadsRouter)

// Views routes
router.use('/', productsViewRouter)
router.use('/carts', cartsViewsRouter)
router.use('/chat', chatViewRouter)
router.use('/users', usersViewsRouter)
router.use('/sessions', sessionViewsRouter)

// Export default
export default router
