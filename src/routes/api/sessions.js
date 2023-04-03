import { Router } from "express"
import { login, logout } from "../../controllers/sessions.controller.js"
import passport from "passport"


const sessionsRouter = Router()

sessionsRouter.post("/login", passport.authenticate('login'), login) // Login
sessionsRouter.get("/logout", logout) // Logout

export default sessionsRouter