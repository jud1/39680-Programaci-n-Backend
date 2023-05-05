import { useState, useEffect, useRef } from "react"
import Cookies from 'js-cookie'
import Button from "../../components/Button/Button"

const Messages = () => {
   const datForm = useRef()
   const [messages, setMessages] = useState(null)
   const [error, setError] = useState(null)
   const coockie = Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)

   useEffect(() => {
      const fetchData = async url => {
         try {
            const response = await fetch(url, {
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${coockie}`,
               }
            })
            if (!response.ok) {
               throw new Error (`
                  Error ${response.status}: ${response.statusText}
               `)
            }

            const responseData = await response.json()
            setMessages(responseData)
         }
         catch(error) {
            setError(error.message)
         }
      }
      fetchData(`${import.meta.env.VITE_API_URL}/messages`)
   }, [])

   const handleClick = evt => {
      evt.preventDefault()
      const formData = new FormData(datForm.current)
      const message = Object.fromEntries(formData)
      if (message.message){
         const fetchData = async url => {
            try{
               const response = await fetch(url, {
                  method: 'POST',
                  headers: {
                     "Content-Type": "application/json",
                     "Authorization": `Bearer ${coockie}`,
                  },
                  body: JSON.stringify(message),
               })
               if (!response.ok) {
                  throw new Error (`
                     Error ${response.status}: ${response.statusText}
                  `)
               }
               const responseData = await response.json()
               setMessages(responseData)
            }
            catch (error) {
               setError(error.message)
            }
         } 
         fetchData(`${import.meta.env.VITE_API_URL}/messages`)
      } else console.log('message not sended')
   }

   return (
      <div className="uk-container">
         <h1>Messages</h1>
         {error ? (
            <div className="uk-alert-danger" uk-alert="">
               <p>{error}</p>
            </div>
         ) : !messages ? (
            <div>Cargando</div>
         ) : (  
            <>
               <form action="" ref={datForm}>
                  <legend className="uk-legend">Deja un mensaje</legend>
                  <div className="uk-margin">
                     <textarea className="uk-textarea" rows="5" placeholder="Mensaje" aria-label="Textarea" name="message"></textarea>
                  </div>
                  <div>
                     <Button style='secondary' onClick={handleClick}>Enviar</Button>
                  </div>
               </form>
               <hr />
               <ul className="uk-list" data-uk-margin="margin: uk-margin-top">
                  { messages.map( item => (
                     <li className="uk-width-2-5@m" key={item._id}>
                        <div className="uk-card uk-card-default uk-card-body uk-border-rounded" data-uk-margin="margin: uk-margin-small-top">
                           
                           <h4 className="uk-text-break">{item.user_email} <small>says:</small></h4>
                           <div>
                              <p className="uk-text-break">{item.message}</p>
                           </div>
                           <em>
                              <small>{(new Date(item.date)).toLocaleString('es-CL', { hour12: false })}</small>
                           </em>
                        </div>
                     </li>
                  )) }
               </ul>
            </> 
         )}
      </div>
   )
}

export default Messages