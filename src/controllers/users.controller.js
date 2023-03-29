import { managerUsers } from "../helpers/managers.js"

const getUser = async (req, res) => {
   res.send(await managerUsers.getElements())
}

const getUsers = async (req, res) => {
   res.send(await managerUsers.getElementById(req.params.id))
}

const addUser = async (req, res) => {
   try {
      await managerUsers.addElements(req.body)
      // WIP: Heres need to initialize session
      res.send(`element added: ${JSON.stringify(req.body)}`)
   }
   catch (error) {
      res.status(400).send({ error: 'Error on create user' });
   }
}

export { getUser, getUsers, addUser }