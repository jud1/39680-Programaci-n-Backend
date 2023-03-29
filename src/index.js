import "dotenv/config"
import express from "express"
import cors from 'cors'
import { Server } from "socket.io"
import { __dirname } from './path.js'
import * as path from 'path'
import { engine } from 'express-handlebars'
import session from "express-session"
import MongoStore from "connect-mongo"
import router from "./routes/routes.js"

// App
const app = express()
app.set('port', process.env.PORT || 5000)

//Middlewares
app.use(cors({origin: process.env.CORS_ORIGIN}))
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

// Handlebars
app.engine("handlebars", engine()) //Config de hbs
app.set("view engine", "handlebars") //Defino mis vistas
app.set("views", path.resolve(__dirname, "./views")) //`${__dirname}/views`

const server = app.listen(app.get('port'), () => { 
   console.log(`Server up on port ${app.get('port')}`) 
})

// Socket.io
const io = new Server(server)
app.set('socketio', io)

// Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/', router)