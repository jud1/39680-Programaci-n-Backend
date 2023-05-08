import { Router } from 'express'
import { current, authorizationRole }from '../../utils/authorization.js'
import { getUsers, getUserById } from '../../controllers/user.js'

const routerUsers = Router()

routerUsers.get('/', current('jwt'), authorizationRole('admin'),getUsers)
routerUsers.get('/:id', current('jwt'), authorizationRole('admin'), getUserById)

export default routerUsers