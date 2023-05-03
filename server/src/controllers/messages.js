import { createMessage, findMessages } from "../services/messagesServices.js"

const getMessages = async(req, res) => {
   try {
      const messages = await findMessages()
      res.status(200).send(messages)
   }
   catch(error) {
      res.status(500).send('Error getting messages', error)
   }
}

const postMessage = async(req, res) => {
   try {
      const { message, user } = req.body
      const newProduct = await createMessage({ message, user_id: user })
      res.status(200).send(newProduct)
   }
   catch(error) {
      res.status(500).send('Error posting message', error)
   }
}

export { getMessages, postMessage }