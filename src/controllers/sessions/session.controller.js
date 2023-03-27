import { getManagerUsers } from "../../dao/daoManager.js"

export const getSession = (req, res, next) => {

   if(req.session.login) { // session active, go to home
      //
      res.redirect('/', {

      })
   }
   else { // session inactive, go to login
      res.redirect('/',{

      })
   }
}

export const testLogin = async (req, res, next) => {

   

   // if user exist in db
  /*  if(req.body.email == "f@f.com" && req.body.password == "1234"){
      req.session.login = true
      res.send('login success')
      res.redirect('/', {
         // error message
      })
   } */
}

export const destroySession = (req, res, next) => {
   if(req.session.login) {
      req.session.destroy(() => {
         console.log('Session destroyed')
      })
   }
   else {
      console.log('for some reason u get this private message')
   }
   res.redirect('/')
}