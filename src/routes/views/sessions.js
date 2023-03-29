import { Router } from 'express'

const sessionViewsRouter = Router()

// View router
sessionViewsRouter.get('/login', (req, res) => {
   if(req.session.uid){
      console.log('Try to login on account with session started')
      res.render('error404', {session: req.session.uid, message: 'For some very strange reason you are trying to login a user while you are logged in. Watch your back'})
   }
   else {
      res.render("login", {})
   }
})

// View router
sessionViewsRouter.get('/register', (req, res) => {
   if(req.session.uid){
      console.log('Try to reguster on account with session started')
      res.render('error404', {session: req.session.uid, message: 'For some very strange reason you are trying to create a user while you are logged in. Last chance to turn back'})
   }
   else {
      res.render("register", {})
   }
})

export default sessionViewsRouter