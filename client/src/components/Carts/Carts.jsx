import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'

const Carts = () => {
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)

   useEffect(() => {
      const fetchData = async url => {
         try {
            const response = await fetch(url, {
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)}`,
               },
               /* credentials: 'include' */
            })
            if (!response.ok) {
               throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const responseData = await response.json()
            setData(responseData)
         } catch (error) {
            setError(error.message)
         }
      }
      fetchData(`${import.meta.env.VITE_API_URL}/carts`)
   }, [])

   console.log(data)

   return (
      <div className="uk-container">
         <h1>All Carts <small>(admin view)</small></h1>

         {error ? (
            <div className="uk-alert-danger" uk-alert="">
               <p>{error}</p>
            </div>
         ) : !data ? (
            <div>Cargando</div>
         ) : (
            <ul className="uk-margin-medium-top uk-child-width-1-3@m uk-child-width-1-2@s uk-grid-small" data-uk-grid="" data-uk-height-match="target: .uk-card">
               {data.map((item) => (
                  <li key={item._id}>
                     <div className="uk-card uk-card-default uk-card-body">
                        <div className="uk-card-badge uk-label">{item._id}</div>
                        {/* <Link to={`/cart/${item._id}`}>
                        </Link> */}
                        {item.products.length > 0 
                           ? <ul className='uk-list'>
                              {item.products.map( item =>
                                 <li key={item._id} data-uk-margin='margin: uk-margin-remove'>
                                    <small>Quantity: {item.quantity}</small>
                                    {/* <Link to={`/products/${product._id}`}>
                                    </Link> */}
                                    <h5 className='uk-display-block uk-text-bold'>{item.product.name}</h5>
                                    <span className='uk-display-block'>id: {item._id}</span>
                                 </li>
                              )}
                           </ul>
                           : <span className='uk-display-block uk-margin-top'>Empty cart</span>
                        } 
                     </div>
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default Carts;
