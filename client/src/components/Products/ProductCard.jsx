import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '../../store.js'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'js-cookie'
import Button from '../Button/Button'

const ProductCard = (props) => {
   // get data from redux (if exist) and show button add cart below
   const user = useSelector(selectUser)
   const navigate = useNavigate()

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
            throw new Error (response.status)
         }
      }
      catch (error) { 
         return error 
      }
   }

   const handleAddProduct = async evt => {
      evt.preventDefault()
      const addProduct = await fetchProductAction(props.props._id, '/carts/addproduct/', 'PUT')
      addProduct == 'Error: 500' ? 
         toast.error("Error adding to cart!", { position: toast.POSITION.BOTTOM_CENTER })
      : navigate('/cart')
   }

   const { name, description, price, sku, status, stock, category } = props.props

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
         <div className="uk-card-body">

            <h5>${price}</h5>
            <p>{description}</p>
         </div>
         { user.data && 
            <div className="uk-card-footer">
               <ul className='uk-grid-small uk-width-auto' data-uk-grid="">
                  <li>
                     <Button style='primary' onClick={handleAddProduct}>+ <span data-uk-icon="cart"></span></Button>
                  </li>
               </ul>
            </div>
         }
      </div>
   )
}

export default ProductCard
