import local from 'passport-local'
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { generate } from 'generate-password'
import { managerUsers } from '../helpers/managers.js'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import { generateToken } from '../utils/jwt.js'

const LocalStrategy = local.Strategy // Define the strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

// This its work as a middleware
const initializePassport = () => {

   const coockieExtractor = req => {
      // If exists the token in cookies, return it, else return null
      const token = req.cookies ? req.cookies.jwtCookie : {}
      return token
   }

   passport.use('jwt', new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromExtractors([coockieExtractor]), // Extract the token from cookies
      secretOrKey: process.env.PRIVATE_KEY_JWT // Decrypt the token
   }, async(jwt_payload, done) => {
      try {
         return done(null, jwt_payload)
      }
      catch(error) {
         return done(error)
      }
   }))

   // Define where apply my statics
   passport.use('register', new LocalStrategy(
      {passReqToCallback: true, usernameField: 'email'}, async (req, username, password, done) => {
         const {completename, email} = req.body
         try{
            const user = await managerUsers.findUserByEmail(username)
            if(user){
               return done(null, false)
            }
            const passportHash = createHash(password)
            const userCreated = await managerUsers.addElements([{
               completename: completename,
               email: email,
               password: passportHash
            }])
            // Registro generado!
            const accessToken = generateToken(userCreated)
            console.log(accessToken)
            return done(null, userCreated)
         }
         catch(error) {
            return done(error)
         }
      }
   ))

   passport.use('login', new LocalStrategy({usernameField: 'email'}, async (username, password, done) => {
      try{
         const user = await managerUsers.findUserByEmail(username)
         // User not found
         if(!user){
            return done(null, false)
         }
         // Success: user and pass correct
         if(validatePassword(password, user.password)){
            const accessToken = generateToken(user)
            return done(null, user)
         }
         // Invalid password
         return done(null, false)
      }
      catch(error){
         return done(error)
      }
   }))

   /*  
   passport.use('github', new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email']
   }, async(accessToken, refreshToken, profile, done) => {
      try {
         const user = await managerUsers.findUserByEmail(profile.emails[0].value) // esto es null
         if(user){ // exist user, error
            done(null, user)
         }
         else {
            const newPassword = generate({ length: 15, numbers: true }) // needs to pass to the user
            const passportHash = createHash(newPassword)
            const userCreated = await managerUsers.addElements([{
               avatar: profile._json.avatar_url,
               completename: profile._json.name ? profile._json.name : profile._json.login,
               email: profile.emails[0].value,
               password: passportHash // Generated
            }])
            done(null, userCreated)
         }
      }
      catch(error){
         return done(error)
      }
   }))
     */

   // User session initialization
   passport.serializeUser((user, done) => {
      if (Array.isArray(user)) {
         const {_id, completename, email, role} = user[0]
         done(null, {_id, completename, email, role})
      }
      else {
         const {_id, completename, email, role} = user
         done(null, {_id, completename, email, role})
      }
   })

   // Delete user session
   passport.deserializeUser(async (id, done) => {
      try {
         const user = await managerUsers.getElementById(id)
         done(null, user)
      } catch (error) {
         done(error)
      }
   })
}

export default initializePassport