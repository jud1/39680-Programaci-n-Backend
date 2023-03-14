import "dotenv/config"
import express from "express"
import { Server } from "socket.io"
import {__dirname} from './path.js'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { getManagerMessages } from "./dao/daoManager.js"

// Import routes
import productsRouter from "./routes/products.routes.js"
import realtimeProductsRouter from "./routes/realtime.produts.routes.js"
import chatRouter from "./routes/chat.routes.js"

const app = express()

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 5000)
app.engine("handlebars", engine()) //Config de hbs
app.set("view engine", "handlebars") //Defino mis vistas
app.set("views", path.resolve(__dirname, "./views")) //`${__dirname}/views`

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)
app.use('/', realtimeProductsRouter)
app.use('/chat', chatRouter)

const server = app.listen(app.get('port'), () => { /* console.log(`server up on port ${app.get('port')}`) */ })
const io = new Server(server)
app.set('socketio', io)

io.on('connection', async socket => {
   const data = await getManagerMessages()
   const managerMessages = new data.ManagerMessagesMongoDB
   const initialMessages = await managerMessages.getElements()
   socket.emit('getInitialMessages', initialMessages)
   socket.on('message', async info => {
      await managerMessages.addElements(info)
      const auxUpd = await managerMessages.getElements()
      socket.emit('updatedMessages', auxUpd)
   })
})