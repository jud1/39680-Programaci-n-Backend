import { Router } from 'express'
import { passportError } from '../../utils/authorization.js'
import { getMessages, postMessage } from '../../controllers/messages.js'

const routerMessages = Router()

routerMessages.get('/', passportError('jwt'), getMessages)
routerMessages.post('/', passportError('jwt'), postMessage)

export default routerMessages