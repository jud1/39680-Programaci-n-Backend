import { Router } from "express"
import { getUser, getUsers, addUser } from '../../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('/', getUser) // getall
usersRouter.get('/', getUsers) // getone
usersRouter.get('/', addUser) // addone

export default usersRouter