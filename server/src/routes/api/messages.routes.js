import { Router } from 'express'
import { current } from '../../utils/authorization.js'
import { getMessages, postMessage } from '../../controllers/messages.js'

const routerMessages = Router()

routerMessages.get('/', current('jwt'), getMessages)
routerMessages.post('/', current('jwt'), postMessage)

export default routerMessages