import session from 'express-session'
import MongoStore from 'connect-mongo'

const sessionConfig = session({
   store: MongoStore.create({
      mongoUrl: process.env.MONGODBURL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 600,
   }),
   secret: process.env.SESSION_SECRET,
   resave: true,
   rolling: true, 
   saveUninitialized: true,
   // cookie: {maxAge: 1000*60*10}
})

export default sessionConfig