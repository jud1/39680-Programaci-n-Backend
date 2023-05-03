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
                  "Authorization": `Bearer ${Cookies.get("token")}`,
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
                        <Link to={`/cart/${item._id}`}>
                           <div className="uk-card-badge uk-label">{item._id}</div>
                        </Link>
                        {item.products.length > 0 
                           ? <ul className='uk-list'>
                              {item.products.map((product) =>
                                 <li key={product._id}>
                                    <small>Quantity: {product.quantity}</small>
                                    <Link to={`/products/${product._id}`}>
                                       <span className='uk-display-block'>{product._id}</span>
                                    </Link>
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
