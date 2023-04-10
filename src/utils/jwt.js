import jwt from 'jsonwebtoken'

export const generateToken = user => {
   const token = jwt.sign(
      {user}, // First argument, assign object 
      process.env.PRIVATE_KEY_JWT, // Second argument, assign private key
      {expiresIn: '20m'}) // Third argument, assign expiration time
   return token
}

export const authToken = (req, res, next) => {
   // Get token from header
   const authHeader = req.headers.authorization

   // If not logged in or token out of date
   if (!authHeader) res.status(401).send({error: "User not authenticated"})

   const token = authHeader.split(' ')[1] // Remove bearer from token

   jwt.sign(token, process.env.PRIVATE_KEY_JWT, (error, credentials) => {
      // Verify if token is valid
      if(error) {
         return res.status(403).send({error: "User not autorized"})
      }

      // Token decoded and valid
      req.user = credentials.user
      next()

   })
}