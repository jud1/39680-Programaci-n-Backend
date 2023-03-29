import { Router } from "express"
import { managerMessages } from "../../helpers/managers.js"

const chatViewRouter = Router()

/* Socket io chat */
const chatSocket = async socket => {
   const initialMessages = await managerMessages.getElements()
   socket.emit('getInitialMessages', initialMessages)
   socket.on('message', async info => {
      await managerMessages.addElements(info)
      const auxUpd = await managerMessages.getElements()
      socket.emit('updatedMessages', auxUpd)
   })
}

chatViewRouter.get('/', async (req, res) => {
   req.app.get('socketio').on('connection', chatSocket)
   res.render("chat")
})

export default chatViewRouter