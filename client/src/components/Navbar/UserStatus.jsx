import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import Cookies from 'js-cookie'

// REDUX
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../store.js'
import { selectAlert } from '../../../store.js'
import { selectUser } from "../../../store.js"

const UserStatus = () => {
   const cookieName = 'token'
   const navigate = useNavigate()

   // REDUX
   const dispatch = useDispatch()
   const alertMessage = useSelector(selectAlert);
   const [isLoading, setIsLoading] = useState(false);

   const user = useSelector(selectUser);
   console.log(user.id)

   const handleLogout = () => {
      Cookies.remove(cookieName)
      dispatch(setUser({
         id: null,
         firstname: null,
         lastname: null,
         avatar: null,
         email: null
      }))
      navigate('/')
   }

   useEffect(() => {

      if (alertMessage) {
         setIsLoading(true);
         fetch(`${import.meta.env.VITE_API_URL}/sessions/usersimple`,
            { 
               headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${Cookies.get("token")}`,
               }
            }
         )
         .then(response => {
            if (!response.ok) {
               throw new Error("Token not valid")
            }
            return response.json()
         })
         .then(data => {
            dispatch(setUser(data))
            setIsLoading(false)
         })
         .catch(error => {
            console.log(error);
            setIsLoading(false);
         })
      }
   }, [alertMessage]);

   

   return (
      <div>
         { user.id !== null 
            
            ? <>
               <button className="uk-button uk-button-default" type="button">
                  <span data-uk-icon="user"></span>
               </button>
               <div uk-dropdown="mode: click">
                  <ul className="uk-nav uk-dropdown-nav">
                     <li className="uk-margin-small-bottom">
                        <span>
                           Hola <strong className="uk-text-uppercase">{user.firstname}</strong> !
                        </span>
                     </li>
                     <li className="uk-nav-divider"></li>
                     <Link to="/messages" className="uk-flex uk-flex-middle uk-link-reset">
                        <span className="uk-margin-small-right" data-uk-icon="mail"></span>
                        <span>Messages</span>
                     </Link>
                     <li className="uk-flex uk-flex-middle uk-hidden">
                        <span className="uk-margin-small-right" data-uk-icon="settings"></span>
                        <a href="#">Account</a>
                     </li>
                     <li className="uk-flex uk-flex-middle">
                        <span className="uk-margin-small-right" data-uk-icon="sign-out"></span>
                        <a href="#" onClick={handleLogout}>Logout</a>
                     </li>
                  </ul>
               </div>
            </>
            : <></>
         }
      </div>
   );
};

export default UserStatus;
