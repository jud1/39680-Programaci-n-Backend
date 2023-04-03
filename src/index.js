import "dotenv/config"
import express from "express"
import cors from 'cors'
import sessionConfig from './config/mongodbSessionsConfig.js'
import passport from "passport"
import { Server } from "socket.io"
import { __dirname } from './path.js'
import * as path from 'path'
import { engine } from 'express-handlebars'
import router from "./routes/routes.js"
import initializePassport from "./config/passport.js"

// App
const app = express()
app.set('port', process.env.PORT || 5000)

//Middlewares
app.use(cors({origin: process.env.CORS_ORIGIN}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionConfig)
// Passport
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

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