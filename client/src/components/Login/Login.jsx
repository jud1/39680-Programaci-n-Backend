import { useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store.js'
import fetchCookie from "../../utils/fetchCookie.js"

const Login = () => {

   const datForm = useRef()
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const consultForm = evt => {
      evt.preventDefault()
      
      // Html to iterable object
      const formData = new FormData(datForm.current)
      
      // Iterable to simple object
      const client = Object.fromEntries(formData)

      fetch(`${import.meta.env.VITE_API_URL}/sessions/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(client),
         /* credentials: 'include' */ // [TODO] WIP SOLUTION, NEEDS TO BE FIXED FOR SERVER CREATE COOKIE
      })
      .then(response => response.json())
      .then(async data => {
         
         // [TODO] Create cookie via react (need to be Express) 
         document.cookie = `${import.meta.env.VITE_COOKIE_SESSION_NAME}=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
         
         // Fetch simple user data
         const user = await fetchCookie()

         console.log(user)

         // Dispatch redux alert
         dispatch(setUser(user))
         
         // Final navigate
         navigate('/')
      })
     .catch(error => console.log(error))
   }

   return (
      <div className="uk-container">
         <form onSubmit={consultForm} ref={datForm}>
            <fieldset className="uk-fieldset">
               <legend className="uk-legend">Login</legend>
               <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="email">Email</label>
                  <input className="uk-input" type="email" placeholder="Email" aria-label="Input" name="email" />
               </div>
               <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="password">Password</label>
                  <input className="uk-input" type="password" placeholder="Password" aria-label="Input" name="password" />
               </div>
               <div className="uk-margin">
                  <button className="uk-button uk-button-primary">Login</button>
               </div>
            </fieldset>
         </form>
      </div>
   )
}

export default Login
