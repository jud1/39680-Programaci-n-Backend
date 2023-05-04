import { NavLink } from "react-router-dom"
import Cookies from 'js-cookie'

const Menu = () => {

   const activeClassName = "uk-text-warning"
   const jwtCookie = Cookies.get('token')

   return (
      <ul id="navigation" className="uk-navbar-nav uk-link-text">
         {! jwtCookie &&
            <>
               <NavLink to={`/login`} className={({ isActive }) => isActive ? activeClassName : undefined}>
                  <span>Login</span>
                  <span data-uk-icon="icon: sign-in"></span>
               </NavLink>
               <NavLink to={`/register`} className={({ isActive }) => isActive ? activeClassName : undefined} >
                  <span>Register</span>
                  <span data-uk-icon="icon: users"></span>
               </NavLink>
            </>
         }
      </ul>
   )
}

export default Menu
