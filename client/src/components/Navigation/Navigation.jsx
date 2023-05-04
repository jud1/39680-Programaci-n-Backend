import { useState } from 'react'
import { NavLink } from "react-router-dom"
import Cookies from 'js-cookie'
import './navigation.min.css'

const Navigation = () => {
   const activeClassName = "uk-text-warning"
   const jwtCookie = Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)

   return (
      <ul id="navigation" className="uk-navbar-nav uk-link-text">
         <NavLink to={'/carts'} className={({ isActive }) => isActive ? activeClassName : undefined}>
            <span>Carts</span>
         </NavLink>
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
