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
      const message = req.body.message
      const { id: user_id, email: user_email } = req.user
      await createMessage({ message, user_id, user_email })
      const allMessages = await findMessages() 
      res.status(200).send(allMessages)
   }
   catch(error) {
      console.error('Error posting message', error)
      res.status(500).send('Error posting message')
   }
}

export { getMessages, postMessage }