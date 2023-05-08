import { Router } from 'express'
import { registerUser, loginUser, getSimpleUser } from '../../controllers/session.js'
import { current } from '../../utils/authorization.js'

const routerSessions = Router()

routerSessions.post('/register', registerUser)
routerSessions.post('/login', loginUser)
routerSessions.get('/usersimple', current('jwt'), getSimpleUser)

export default routerSessions