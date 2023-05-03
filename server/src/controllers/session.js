import { createUser, findUserByEmail } from "../services/usersServices.js"
import passport from "passport"
import jwt from "jsonwebtoken"
import { validatePassword, createHash } from "../utils/bcrypt.js"

const loginUser = async (req, res, next) => {
   try {
      passport.authenticate('jwt', { session: false }, async (error, user, info) => {
         if (error) {
            return res.status(401).send("Error on token")
         }

         // Token does not exist, so I validate the user
         if (!user) {
            const { email, password } = req.body
            const userBDD = await findUserByEmail(email)

            if (!userBDD || !validatePassword(password, userBDD.password)) {
               return res.status(401).send("Not valid credentials")
            }

            // User valid, so i create the token
            const token = jwt.sign(
               { user: { id: userBDD._id } }, 
               process.env.JWT_SECRET
            )
            
            // I send the token to the client
            res.cookie('jwt', token, 
               { httpOnly: true, secure: false, signed: true, expires: new Date(Date.now() + 3600000) }
            )

            return res.status(200).json({ token })

         }
         // Token exist, so i validate the token
         else {
            const token = req.cookies.jwt;
            jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
               if (error) {
                  // Token no valido
                  return res.status(401).send("Not valid credentials")
               } else {
                  // Token valido
                  req.user = user
                  return res.status(200).send("Valid credentials")
               }
            })
         }

      })(req, res, next)
   }
   catch (error) {
      res.status(500).send(`Error on session, ${error}`)
   }
}

const registerUser = async (req, res) => {
   try {
      const { firstname, lastname, email, password } = req.body
      const userBDD = await findUserByEmail(email)

      if (userBDD) {
         res.status(401).send("User already registered")
      } 
      else {
         const hashPassword = createHash(password)
         const newUser = await createUser({ firstname, lastname, email, password: hashPassword })

         const token = jwt.sign(
            { user: { id: newUser._id } }, 
            process.env.JWT_SECRET
         )
         
         // I send the token to the client
         res.cookie('jwt', token, 
            { httpOnly: true, secure: false, signed: true, expires: new Date(Date.now() + 3600000) }
         )

         return res.status(200).json({ token })
      }


   } catch (error) {
      res.status(500).send(`Error on register user, ${error}`)
   }

}

const getSimpleUser = async (req, res) => {
   try {
      const simpleUser = {
         id: req.user.id,
         firstname: req.user.firstname,
         lastname: req.user.lastname,
         avatar: req.user.avatar,
         email: req.user.email
      }
      res.status(200).send(simpleUser)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

const logoutUser = (req, res) => {
   try {
     // Obtengo el token desde la cookie
     const token = req.signedCookies.jwt
 
     // Si no hay token, envío un error 401
     if (!token) {
       return res.status(401).send("No se encontró el token")
     }
 
     // Elimino la cookie del token
     res.clearCookie("jwt")
 
     // Envío una respuesta exitosa
     return res.status(200).send("Logout exitoso")
   } 
   catch (error) {
     // Si ocurre algún error, envío un error 500 con el mensaje del error
     res.status(500).send(`Error en el logout: ${error}`)
   }
}

export { loginUser, registerUser, getSimpleUser, logoutUser }