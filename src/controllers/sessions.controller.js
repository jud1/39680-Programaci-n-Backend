import { managerUsers } from "../helpers/managers.js"
import { validatePassword } from "../utils/bcrypt.js"
import { getUserByEmail } from "./users.controller.js"


const login = async (req, res) => {
   const { email, password } = req.body
   const user = await getUserByEmail(email)

   try {
      if(!req.user) {
         return res.status(401).send({status: 'error', error: 'User not found'})
      }
      res.status(200).send({status: 'success', payload: req.user})
   }
   catch(error) {
      res.status(500).send.json({
         message: error.message
      })
   }
}

const logout = async (req, res) => {
   if(req.session.passport) {
      req.session.destroy(() => {
         console.log('Session destroyed')
         res.redirect('/')
      })
   }
   else {
      console.log('Not session to logout')
      res.render('error404', {session: req.session.uid, message: 'For some very strange reason you are trying to forcefully close the session and there is no session started. Be careful with your actions.'})
   }
} 

export { login, logout }