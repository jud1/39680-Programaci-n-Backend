import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import ProductCard from "./ProductCard"
import Cookies from 'js-cookie'
import Button from "../Button/Button"

const Products = () => {
   const navigate = useNavigate()
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
            setError('Connection failed')
         }
      }
      fetchData(`${import.meta.env.VITE_API_URL}/carts/mycart`)
   }, [])

   const purcharce = async () => {
      const fetchData = async url => {
         try {
            const response = await fetch(url, {
               method: 'POST',
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)}`,
               },
               /* credentials: 'include' */
            })
            if(!response.ok) {
               throw new Error(`Error ${response.status}: ${response.statusText}`)
            }

            const responseData = await response.json()
            // console.log(responseData)

            navigate(`/order/${responseData._id}`)
         }

         catch (error) {
            setError(error)
         }
      }
      fetchData(`${import.meta.env.VITE_API_URL}/orders/`)
   }

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
         <Button onClick={purcharce}>Comprar</Button>
         <h1>Cart</h1>
         <ul className="uk-margin-medium-top uk-child-width-1-3 uk-grid-small" uk-grid="">
            {data.products.map((item) => (
               <li key={item.product._id}>
                  <ProductCard props={item} />
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Products
