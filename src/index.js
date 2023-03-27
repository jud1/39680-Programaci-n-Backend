import "dotenv/config"
import express from "express"
import { Server } from "socket.io"
import {__dirname} from './path.js'
import { engine } from 'express-handlebars'
import * as path from 'path'
import { getManagerMessages } from "./dao/daoManager.js"
import session from "express-session"
import cookieParser from "cookie-parser"
import MongoStore from "connect-mongo"


// Import routes
import productsRouter from "./routes/products.routes.js"
import realtimeProductsRouter from "./routes/realtime.produts.routes.js"
import cartsRouter from "./routes/carts.routes.js"
import cartsViewsRouter from "./routes/cartsViews.routes.js"
import chatRouter from "./routes/chat.routes.js"
import uploadRouter from "./routes/upload.routes.js"
import {sessionRouter , sessionApiRouter} from "./routes/session.routes.js"
import {usersRouter, usersApiRouter} from "./routes/users.routes.js"

const app = express()

//Middlewares
app.use(cookieParser(process.env.SIGNED_COOKIE)) // Puedo Implementar coockie sen mi app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ 
   store: MongoStore.create({ 
      mongoUrl: process.env.MONGODBURL, 
      mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true }, 
      ttl: 300
   }),
   secret: process.env.SESSION_SECRET, 
   resave: true, 
   saveUninitialized: true 
}))

app.set('port', process.env.PORT || 5000)
app.engine("handlebars", engine()) //Config de hbs
app.set("view engine", "handlebars") //Defino mis vistas
app.set("views", path.resolve(__dirname, "./views")) //`${__dirname}/views`

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)
app.use('/', realtimeProductsRouter)
app.use('/api/carts', cartsRouter)
app.use('/carts', cartsViewsRouter)
app.use('/chat', chatRouter)
app.use('/upload', uploadRouter)
app.use('/api/session', sessionApiRouter)
app.use('/session', sessionRouter)
app.use('/users', usersRouter)
app.use('/api/users', usersApiRouter)

const server = app.listen(app.get('port'), () => { console.log(`Server up on port ${app.get('port')}`) })
const io = new Server(server)
app.set('socketio', io)

// Needs to be modularized
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