import { useState, useEffect } from "react"
import ProductCard from "../Products/ProductCard"
import Cookies from 'js-cookie'

const Products = () => {
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
            console.log(responseData)
            setData(responseData)
         } catch (error) {
            setError('Connection failed')
         }
      }
      fetchData(`${import.meta.env.VITE_API_URL}/carts/my-cart/`)
   }, [])
   if (error) {
      return (
         <div className="uk-container">
            <div className="uk-alert-warning" data-uk-alert="">
               <p>{error}</p>
            </div>
         </div>
      )
   }

   if (!data) {
      return(
         <div className="uk-container">
            <div className="uk-alert-primary" data-uk-alert="">
               <p>Loading...</p>
            </div>
         </div>
      )
   }

   if (data.products.length<1) {
      return(
         <div className="uk-container">
            <div className="uk-alert-primary" data-uk-alert="">
               <p>Empty cart</p>
            </div>
         </div>
      )
   }

   return (
      <div className="uk-container">
         <h1>Products</h1>
         <ul className="uk-margin-medium-top uk-child-width-1-3 uk-grid-small" uk-grid="">
            {data.products.map((item) => (

               <li key={item.product._id}>
                  <ProductCard props={item.product} />
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Products
