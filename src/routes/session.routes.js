import { Router } from "express"
import { getManagerUsers } from "../dao/daoManager.js"

const sessionRouter = Router()
const sessionApiRouter = Router()

/* 
API ROUTER
*/
sessionApiRouter.post('/login', async (req, res, next) => { // voy a recibir email y password
   const data = await getManagerUsers()
   const managerusers = new data.ManagerUsersMongoDB
   const user = await managerusers.findUserByEmail(req.body.email)
   const password = req.body.password
   
   // Tenemos el user
   if(user && user.password === password){
      console.log('Password correct')
      req.session.uid = {
         uid: user.id,
         email: user.email,
         isAdmin: user.role === 'admin' ? true : false
      }
      res.status(200).json({ message: 'Password correct'})
   }
   else if(user && user.password !== password) {
      console.log('Password incorrect')
      res.status(400).send({ error: 'Contraseña incorrecta.' })
   }
   else{
      console.log('User not found')
      res.status(400).send({ error: 'Usuario no encontrado.' })
   } 
})

sessionApiRouter.get('/logout', (req, res, next) => {
   if(req.session.uid) {
      req.session.destroy(() => {
         console.log('Session destroyed')
         res.redirect('/')
      })
   }
   else {
      console.log('Not session to logout')
      res.render('error404', {session: req.session.uid, message: 'For some very strange reason you are trying to forcefully close the session and there is no session started. Be careful with your actions.'})
   }
})

/* 
VIEWS 
*/

// View router
sessionRouter.get('/login', (req, res) => {
   if(req.session.uid){
      console.log('Try to login on account with session started')
      res.render('error404', {session: req.session.uid, message: 'For some very strange reason you are trying to login a user while you are logged in. Watch your back'})
   }
   else {
      res.render("login", {})
   }
})

// View router
sessionRouter.get('/register', (req, res) => {
   if(req.session.uid){
      console.log('Try to reguster on account with session started')
      res.render('error404', {session: req.session.uid, message: 'For some very strange reason you are trying to create a user while you are logged in. Last chance to turn back'})
   }
   else {
      res.render("register", {})
   }
})


export { sessionRouter, sessionApiRouter }