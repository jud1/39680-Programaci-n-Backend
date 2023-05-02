import { Router } from 'express'
import { registerUser, loginUser } from '../../controllers/session.js'
import { findUserById } from '../../services/usersServices.js'
import jwt from 'jsonwebtoken'

const routerSessions = Router()

routerSessions.post('/register', registerUser)
routerSessions.post('/login', loginUser)
routerSessions.get('/usersimple', async (req, res) =>{
   try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken.user.id;
      const user = await findUserById(userId)
      const simpleUser = {
         firstname: user.firstname,
         lastname: user.lastname,
         avatar: user.avatar
      }
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      return res.status(200).json({ message: "Success", user: simpleUser });
    } catch (error) {
      console.log(error);
      return res.status(401).json({ message: "Unauthorized" });
    }
})

export default routerSessions