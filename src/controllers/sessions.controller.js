import { managerUsers } from "../helpers/managers.js"

const login = async (req, res) => {
   const user = await managerUsers.findUserByEmail(req.body.email)
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
}

const logout = async (req, res) => {
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
} 

export { login, logout }