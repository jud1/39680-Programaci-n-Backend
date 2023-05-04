import { useRef } from "react"

const Register = () => {

   const datForm = useRef()
   const consultForm = evt => {
      evt.preventDefault()

      // Html to iterable object
      const formData = new FormData(datForm.current)

      // Iterable to simple object
      const client = Object.fromEntries(formData)
      console.log(client)

      fetch(`${import.meta.env.VITE_API_URL}/sessions/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(client),
         // credentials: 'include' // WIP SOLUTION, NEEDS TO BE FIXED FOR SERVER CREATE COOKIE
      })
      .then(response => response.json())
      .then(data => {
         document.cookie = `${import.meta.env.VITE_COOKIE_SESSION_NAME}=${data.token};expires=${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/`
         navigate(-1)
      })
      .catch(error => console.log(error))
   }

   return (
      <div className="uk-container">
         <form onSubmit={consultForm} ref={datForm}>
            <fieldset className="uk-fieldset">
               <legend className="uk-legend">Register</legend>
               <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="firstname">First Name</label>
                  <input className="uk-input" type="text" placeholder="First name" aria-label="Input" name="firstname" />
               </div>
               <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="lastname">Last name</label>
                  <input className="uk-input" type="text" placeholder="Last Name" aria-label="Input" name="lastname" />
               </div>
               <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="email">Email</label>
                  <input className="uk-input" type="email" placeholder="Email" aria-label="Input" name="email" />
               </div>
               <div className="uk-margin">
                  <label className="uk-form-label" htmlFor="password">Password</label>
                  <input className="uk-input" type="password" placeholder="Password" aria-label="Input" name="password" />
               </div>
               <div className="uk-margin">
                  <button className="uk-button uk-button-primary">Register</button>
               </div>
            </fieldset>
         </form>
      </div>
   )
}

export default Register