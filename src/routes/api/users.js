import { Router } from "express"
import passport from "passport"
import { getUser, getUsers, createUser } from '../../controllers/users.controller.js'

const usersRouter = Router()

usersRouter.get('/', getUser) // getall
usersRouter.get('/', getUsers) // getone
usersRouter.post('/', createUser) // addone

usersRouter.post('/register', passport.authenticate('register'), createUser)

export default usersRouter