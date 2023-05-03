import { Router } from 'express'
import { registerUser, loginUser, getSimpleUser } from '../../controllers/session.js'
import { passportError } from '../../utils/authorization.js'

const routerSessions = Router()

routerSessions.post('/register', registerUser)
routerSessions.post('/login', loginUser)
routerSessions.get('/usersimple', passportError('jwt'), getSimpleUser)

export default routerSessions