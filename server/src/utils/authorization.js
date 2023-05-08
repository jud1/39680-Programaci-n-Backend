import passport from "passport"
import { findOrder } from "../services/orders.service.js"

// General function to return error in to strategy of passport
const current = strategy => {
   return async (req, res, next) => {
      passport.authenticate(strategy, (error, user, info) => {
         if (error) {
            return next(error)
         }
         if(!user) {
            // If exists messages property, return messages, else return info.toString()
            const errorMsg = info && info.messages ? info.messages : 'Unauthorized';
            return res.status(401).json({ error: errorMsg });
         }
         req.user = user
         next()
      }) (req, res, next)
   }
}

const authorizationRole = role => {
   return async (req, res, next) => {
      if(!req.user) {
         return res.status(401).send({error: 'Unauthorized'})
         // return res.send('401')
      }
      if(req.user.role !== role) {
         return res.status(403).send({error: 'User not authorized'})
         // return res.send('403')
      }
      next()
   }
}

const authUserOnGetOrder = (strategy) => {
   return async (req, res, next) => {
      passport.authenticate(strategy, async (error, user, info) => {
         
         const order = await findOrder(req.params.id)
         
         if (error) {
            return next(error)
         }
         if(!user) {
            // If exists messages property, return messages, else return info.toString()
            const errorMsg = info && info.messages ? info.messages : 'Unauthorized'
            return res.status(401).json({ error: errorMsg })
         }
         if(order.purchaser !== user.id) {
            const errorMsg = info && info.messages ? info.messages : 'User not authorized'
            return res.status(403).json({ error: errorMsg })
         }
         req.user = user
         next()
      }) (req, res, next)
   }
}

export { current, authorizationRole, authUserOnGetOrder }