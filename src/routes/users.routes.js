import { Router } from "express"
import { getManagerUsers } from "../dao/daoManager.js"

const usersRouter = Router()
const usersApiRouter = Router()

// (GET ALL) http://localhost:8080/api/users
usersApiRouter.get('/', async (req, res) => {
   const data = await getManagerUsers()
   const managerusers = new data.ManagerUsersMongoDB
   const aux = await managerusers.getElements()
   
   // Defaut res
   res.send(aux)
})

// (GET ONE) http://localhost:8080/api/users/1
usersApiRouter.get('/:id', async (req, res) => {
   const data = await getManagerUsers()
   const managerusers = new data.ManagerUsersMongoDB
   const aux = await managerusers.getElementById(req.params.id)
   
   // Defaut res
   res.send(aux)
})

// (ADD ONE) http://localhost:8080/api/users/ (body required)
usersApiRouter.post('/', async (req, res) => {
   try {
      const data = await getManagerUsers()
      const managerusers = new data.ManagerUsersMongoDB
      await managerusers.addElements(req.body)
      
      // Defaut res
      res.send(`element added: ${JSON.stringify(req.body)}`)
   }
   catch (error) {
      // console.log(`Error on create an element(s): ${error}`);
      res.status(400).send({ error: 'Error on create user' });
   }
})

/* 
VIEW
*/

usersRouter.get('/', async (req, res) => {
   const data = await getManagerUsers()
   const managerusers = new data.ManagerUsersMongoDB

   const users = await managerusers.getElements()

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

export {usersRouter, usersApiRouter}