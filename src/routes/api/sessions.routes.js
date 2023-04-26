import { Router } from 'express'
import { registerUser, loginUser } from '../../controllers/session.js'

const routerSessions = Router()

routerSessions.post('/register', registerUser)
routerSessions.post('/login', loginUser)

export default routerSessions