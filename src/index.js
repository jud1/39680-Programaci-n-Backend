import "dotenv/config"
import express from "express"
import { Socket } from "socket.io"
import { getManagerMessages } from './dao/daoManager.js'

const app = express()
const managerMessage = new getManagerMessages()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 5000)

const server = app.listen(app.get('port'), () => {
   console.log(`server up on port ${app.get('port')}`)
})

const io = Socket(server)

io.on('connection', socket => {
   socket.on('message', info => {
      managerMessage.addElements([info])
         .then(() => {
            managerMessage.getElements()
               .then(messages => {
                  console.log(messages)
                  socket.emmit('allMessages', messages)
               })
         })
   })
})