import { Router } from "express"
import { login, logout } from "../../controllers/sessions.controller.js"
import passport from "passport"
import { authorization, passportError } from "../../utils/messageErrors.js"

const sessionsRouter = Router()

sessionsRouter.post("/login", passport.authenticate('login'), login) // Login
sessionsRouter.get("/logout", logout) // Logout
// get coockies from browser
sessionsRouter.get('/jwt', passport.authenticate('jwt', {session: false}), (req, res) => {
   res.send(req.user)
})

sessionsRouter.get('/current', passportError('jwt'), authorization('admin'), (req, res) => {
   res.send(req.user)
})

export default sessionsRouter