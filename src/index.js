import "dotenv/config"
import express from "express"
import { Server } from "socket.io"
import { getManagerMessages } from './dao/daoManager.js'

/* Routes */
import productsRouter from "./routes/products.routes.js"
/* import cartsRouter from "./routes/cart.routes.js"
import messagesRouter from "./routes/user.routes.js" */

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 5000)

//Routes
app.use('/api/products', productsRouter)

const server = app.listen(app.get('port'), () => { /* console.log(`server up on port ${app.get('port')}`) */ })
const io = new Server(server)
app.set('socketio', io)


/* app.use('/', express.static(__dirname + '/public'))
app.use('/', realTimeProductsRouter)
app.use('/users', usersRouter) */

const prueba = async () => {
   console.log('aa')
   const data = await getManagerMessages()
   const managerMessage = new data.MessageDaoMongoDB
}
prueba()

io.on("connection", async (socket) => {
   console.log('a')
   socket.on("message", async (info) => {
      const data = await getManagerMessages()
      const managerMessage = new data.ManagerMessageMongoDB
      managerMessage.addElements([info]).then(() => {
         managerMessage.getElements().then((mensajes) => {
            console.log(mensajes)
            socket.emmit("allMessages", mensajes)
         })
      })
   })
})