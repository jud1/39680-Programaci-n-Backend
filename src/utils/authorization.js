import passport from "passport"
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

// General function to return error in to strategy of passport
export const passportError = (strategy) => {
   return async (req, res, next) => {
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
      console.log(token)
      passport.authenticate(strategy, (error, user, info) => {
         console.log(user.id)
         if (error) {
            return next(error)
         }
         if(!user) {
            // If exists messages property, return messages, else return info.toString()
            const errorMsg = info && info.messages ? info.messages : 'Unauthorized';
            return res.status(401).json({ error: errorMsg });
         }
         console.log('c')
         req.user = user
         next()
      }) (req, res, next)
   }
}

export const authorizationRole = (role) => {
   return async (req, res, next) => {
      if(!req.user) {
         return res.render('401')
         // return res.status(401).send({error: 'Unauthorized'})
      }
      if(req.user.role != role) {
         return res.render('401')
         //return res.status(403).send({error: 'User not authorized'})
      }
      next()
   }
}

export const authorizationMatchUser = (id) => {
   return async (req, res, next) => {
      if(!req.user) {
         return res.render('401')
         // return res.status(401).send({error: 'Unauthorized'})
      }
      if(req.user.id != id) {
         return res.render('401')
         //return res.status(403).send({error: 'User not authorized'})
      }
      next()
   }
}