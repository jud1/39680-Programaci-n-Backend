import { Router } from "express"
import { login, logout } from "../../controllers/sessions.controller.js"

const sessionsRouter = Router()

sessionsRouter.post("/login", login) // Login
sessionsRouter.get("/logout", logout) // Logout

export default sessionsRouter