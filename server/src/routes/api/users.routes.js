import { Router } from 'express'
import { passportError, authorizationRole }from '../../utils/authorization.js'
import { getUsers, getUserById } from '../../controllers/user.js'

const routerUsers = Router()

routerUsers.get('/', passportError('jwt'), authorizationRole('admin'),getUsers)
routerUsers.get('/:id', passportError('jwt'), authorizationRole('admin'), getUserById)

export default routerUsers