import { managerUsers } from "../helpers/managers.js"

const getUser = async (req, res) => {
   res.send(await managerUsers.getElements())
}

const getUsers = async (req, res) => {
   res.send(await managerUsers.getElementById(req.params.id))
}

// CREATE USER
const createUser = async (req, res) => {
   res.send({status: 'success', message: 'User was created successfully'})
}

const getUserById = async (req, res) => {
   const { id } = req.params
   try {
      const user = await managerUsers.getElementById(id)
      if(user) {
         return res.status(200).json({
            message: user
         }) // o user sin object
      }
      return res.status(200).json({
         message: 'User not found'
      })
   }
   catch(error) {
      res.status(500).json({
         message: error.message,
      })
   }
}

const getUserByEmail = async (email) => {
   try {
      const user = await managerUsers.findUserByEmail(email)
      if(user) {
         return user
      }
      return 'User not found'
   }
   catch(error) {
      return error
   }
}

export { getUser, getUsers, createUser, getUserById, getUserByEmail }