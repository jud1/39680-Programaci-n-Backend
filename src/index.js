import 'dotenv/config.js'
import express from 'express'
import connectDB from './config/mongoose.js'
import { Server } from "socket.io"
import router from './routes/routes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passport/passport.js'

// Define express app
const app = express()
app.set('port', process.env.PORT || 8080)

// Define middleware for parsing JSON and urlencoded data
app.use(express.json())

// Connect to MongoDB from external file
connectDB()

app.use(cors({ 
   origin: process.env.CORS_ORIGIN.split(','),
   /* credentials: true */
}))

// Define cookie parser
app.use(cookieParser(process.env.JWT_SECRET,  {
   /* httpOnly: true,
   secure: false,
   signed: true */
}))

// Define passport
app.use(passport.initialize())
initializePassport(passport)

// User router
app.use('/', router)

// Define listen server
const server = app.listen(app.get('port'), () => { 
   console.log(`Server up on port ${app.get('port')}`) 
})

// Define socket.io
const io = new Server(server)
app.set('socketio', io)