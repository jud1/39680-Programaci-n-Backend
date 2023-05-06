import { useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import Cookies from 'js-cookie'

const ProductCard = ({props}) => {
   const navigate = useNavigate()
   const quantity = props.quantity
   const { name, description, price, sku, status, stock, category, _id } = props.product

   const fetchProductAction = async (pid, url, method) => {
      try {
         const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, {
            method: method,
            headers: {
               "Content-Type": "application/json",
               "Authorization": `Bearer ${Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)}`,
            },
            body: JSON.stringify({pid: pid}),
         })
         if (!response.ok) {
            throw new Error (`
               Error ${response.status}: ${response.statusText}
            `)
         }
         console.log(response)
      }
      catch (error) {
         console.log('Error remove to cart')
      }
   }

   const handleRemoveProduct = async evt => {
      evt.preventDefault()
      await fetchProductAction(_id, '/carts/removeproduct/', 'DELETE')
      navigate(0)
   }

   return (
      <div className="uk-card uk-card-default">
         <div className="uk-card-header">
            <div className="uk-grid-small uk-flex-middle" uk-grid="">
               <div className="uk-width-auto">{/* <img className="uk-border-circle" width="40" height="40" src="images/avatar.jpg" alt="Avatar"> */}</div>
               <div className="uk-width-expand">
                  <h3 className="uk-card-title uk-margin-remove-bottom">{name}</h3>
                  <p className="uk-text-meta uk-margin-remove-top">
                     <small>Stock: {stock}</small>
                     <span> | </span>
                     <small>Sku: {sku}</small>
                  </p>
               </div>
            </div>
         </div>
         <div className="uk-card-body" data-uk-margin="margin: uk-margin-small-top uk-margin-remove-bottom">
            <h5 className="uk-margin-remove-bottom">
               Quantity: {quantity}
            </h5>
            <h5>${price}</h5>
            <p>{description}</p>
         </div>
         <div className="uk-card-footer">
            <ul className='uk-grid-small uk-width-auto' data-uk-grid="">
               <li>
                  <Button style='secondary' onClick={handleRemoveProduct}>Remove</Button>
               </li>
            </ul>
         </div>
      </div>
   )
}

export default ProductCard
