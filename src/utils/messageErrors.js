import passport from "passport"

// General function to return error in to  strategy of passport
export const passportError = (strategy) => {
   return async (req, res, next) => {
      passport.authenticate(strategy, (error, user, info)=> {
         if (error) {
            return next(error)
         }
         if(!user) {
            // If exists messages property, return messages, else return info.toString()
            return res.status(401).json({error: info.messages ? info.messages : info.toString()})
         }
         req.user = user
         next()
      }) (req, res, next)
   }
}

export const authorization = (role) => {
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