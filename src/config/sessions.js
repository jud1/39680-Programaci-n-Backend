import session from 'express-session'
import MongoStore from 'connect-mongo'

const sessionConfig = session({
   store: MongoStore.create({
      mongoUrl: process.env.MONGODBURL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 300,
   }),
   secret: process.env.SESSION_SECRET,
   resave: true,
   saveUninitialized: true,
})

export default sessionConfig