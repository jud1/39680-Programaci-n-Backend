import { useState, useEffect } from "react"
import ProductCard from "./ProductCard"

const Products = () => {
   const [data, setData] = useState(null)
   const [error, setError] = useState(null)


   useEffect(() => {
      const fetchData = async url => {
         try {
            const response = await fetch(url)
            if (!response.ok) {
               throw new Error("Network response was not ok")
            }
            const responseData = await response.json()
            setData(responseData)
            
         } catch (error) {
            setError('Connection failed')
         }
      }
      fetchData(`${import.meta.env.VITE_API_URL}/products/paginated`)
   }, [])

   if (error) {
      return (
         <div className="uk-container">
            <div className="uk-alert-danger" uk-alert="">
               <p>{error}</p>
            </div>
         </div>
      )
   }

   if (!data) {
      return <div></div>
   }

   return (
      <div className="uk-container">
         <h1>Products</h1>
         <ul className="uk-margin-medium-top uk-child-width-1-3 uk-grid-small" data-uk-grid="">
            {data.docs.map((item) => (

               <li key={item._id}>
                  <ProductCard props={item} />
               </li>
            ))}
         </ul>
      </div>
   )
}

export default Products
