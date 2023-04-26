import { Router } from 'express'
import { getUsers, getUserById } from '../../controllers/user.js'

const routerUsers = Router()

routerUsers.get('/', getUsers)
routerUsers.get('/:id', getUserById)

export default routerUsers