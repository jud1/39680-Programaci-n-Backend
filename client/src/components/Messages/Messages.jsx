import { useState, useEffect } from "react"
import Cookies from 'js-cookie'

const Messages = () => {
   const [messages, setMessages] = useState(null)
   const [error, setError] = useState(null)

   useEffect(() => {
      const fetchData = async url => {
         try {
            const response = await fetch(url, {
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)}`,
               }
            })
            if (!response.ok) {
               throw new Error (`
                  Error ${response.status}: ${response.statusText}
               `)
            }

            const responseData = await response.json()
            console.log(responseData)
            setMessages(responseData)
         }
         catch(error) {
            setError(error.message)
         }
      }
      fetchData(`${import.meta.env.VITE_API_URL}/messages`)
   }, [])

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
            <ul className="uk-list" data-uk-margin="margin: uk-margin-top">
               {messages.map( item => (
                  <li className="uk-width-2-5@m" key={item._id}>
                     <div className="uk-card uk-card-default uk-card-body uk-border-rounded" data-uk-margin="margin: uk-margin-small-top">
                        
                        <h4 className="uk-text-break">{item.user_id} <small>says:</small></h4>
                        <div>
                           <p className="uk-text-break">{item.message}</p>
                        </div>
                        <em>
                           <small>{(new Date(item.date)).toLocaleString('es-CL', { hour12: false })}</small>
                        </em>
                     </div>
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default Messages