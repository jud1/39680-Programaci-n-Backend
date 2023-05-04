import { useState } from 'react'
import { NavLink } from "react-router-dom"
import Cookies from 'js-cookie'
import './navigation.min.css'

const Navigation = () => {
   const activeClassName = "uk-text-warning"
   const cookieName = 'token'
   const jwtCookie = Cookies.get(cookieName)

   const [navigationList] = useState([
      { label: "Carts", url: "carts" }
   ])

   return (
      <ul id="navigation" className="uk-navbar-nav uk-link-text">
         {navigationList.map((item, index) =>
            <NavLink key={index} to={`/${item.url}`} className={({ isActive }) => isActive ? activeClassName : undefined}>
               {item.label}
            </NavLink>
         )}
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

export default Navigation
