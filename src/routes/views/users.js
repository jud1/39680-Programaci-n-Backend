import { Router } from 'express'
import { managerUsers } from '../../helpers/managers.js'

const usersViewsRouter = Router()

usersViewsRouter.get('/', async (req, res) => {
   const users = await managerUsers.getElements()

   if(req.session.uid && req.session.uid.isAdmin){
      res.render('users', {
         users : users.map(user => user.toJSON()),
         session: req.session.uid
      })
   }
   else {
      console.log('Access denied on users without admin role')
      res.render('error404', {session: req.session.uid, message: '...'})
   }
})

export default usersViewsRouter