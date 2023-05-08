import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Cookies from 'js-cookie'

const Order = () => {
   const {id} = useParams()
   const [order, setOrder] = useState(null)
   
   useEffect(() => {

      const fetchOrder = async url => {
         try {
            const response = await fetch(url, {
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)}`,
               },
               // credentials: 'include'
            })

            if (!response.ok) {
               throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const responseData = await response.json()
            setOrder(responseData)
         }
         catch(error) {
            console.log(error)
         }
      }
      fetchOrder(`${import.meta.env.VITE_API_URL}/orders/${id}`)
   }, [])

   return (
      <div className="uk-container">
         { order &&
            <div>
               <h1>Order: {order.code}</h1>
               <pre>
                  <code>
                     {JSON.stringify(order, null, 2)}
                  </code>
               </pre>
            </div>
         }
      </div>
   )
}

export default Order
