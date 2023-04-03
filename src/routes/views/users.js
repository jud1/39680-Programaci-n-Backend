import { Router } from 'express'
import { managerUsers } from '../../helpers/managers.js'

const usersViewsRouter = Router()

usersViewsRouter.get('/', async (req, res) => {
   const users = await managerUsers.getElements()

   if(req.session.passport && req.session.passport.user.role === 'admin'){
      res.render('users', {
         users : users.map(user => user.toJSON()),
         session: req.session.passport ? req.session.passport : null,
         isAdmin: (req.session.passport && req.session.passport.user && req.session.passport.user.role === 'admin') ? true : false
      })
   }
   else {
      console.log('Access denied on users without admin role')
      res.render('error404', {session: req.session.passport, message: '...'})
   }
})

export default usersViewsRouter