import { useState, useEffect } from 'react'
import { Link, useNavigate, NavLink } from "react-router-dom"
// REDUX
import { selectUser } from '../../store.js'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '../../store.js'
import Logo from '../Logo/Logo'
import Cookies from 'js-cookie'
import Menu from './Menu'
import './menu.min.css'


const Navbar = () => {

   // Hook Resize to mb
   const [mbsize] = useState(959)
   const [windowWidth, setWindowWidth] = useState(window.innerWidth)
   const handleResize = () => {
      setWindowWidth(window.innerWidth)
   }
   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])
   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])

   // Data from REDUX
   const user = useSelector(selectUser)
   const dispatch = useDispatch()

   // Misc
   const navigate = useNavigate() // [TODO]: Part of fix redux, render, more below
   const activeClassName = "uk-text-warning"
   const cookieName = import.meta.env.VITE_COOKIE_SESSION_NAME
   const jwtCookie = Cookies.get(cookieName)

   // REDUX
   const handleLogout = () => {
      dispatch(clearUser())
      Cookies.remove(cookieName)
      navigate('/')
   }

   return (
      <nav className="uk-navbar-container">
         <div className="uk-container">
            <div data-uk-navbar="mode: click">

               {/* LEFT Navbar */}
               <div className="uk-navbar-left uk-margin-right">
                  {/* LOGO */}
                  <Link className="uk-navbar-item uk-logo" to="/" aria-label="Back to Home">
                     <Logo/>
                  </Link> 
                  {/* USER MENU (conditional) */} 
                  <div> {/* [TODO]: Pass this entire div on a componente */}
                     { user.data !== null 
                        ? <>
                           <a href="#">
                              <img className="uk-border-circle" width="40" height="40" src={user.data.avatar} alt="Avatar" />
                           </a>
                           <div uk-dropdown="mode: click">
                              <ul className="uk-nav uk-dropdown-nav">
                                 <li className="uk-margin-small-bottom">
                                    <span>
                                       Hola <strong className="uk-text-uppercase">{user.data.firstname}</strong> !
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
                        : false
                     }
                  </div>
               </div>

               {/* RIGHT Navbar */}
               <div className="uk-navbar-right">
                  { jwtCookie && user.id !== null
                     ? <NavLink to={`/cart`} className={({ isActive }) => isActive ? activeClassName : undefined}>
                        <span data-uk-icon="icon: cart"></span>
                        <span>Cart</span>
                     </NavLink>
                     : false
                  }

                  { windowWidth > mbsize 
                     ? <Menu/>
                     : <>
                        {/* Show MB Button */}
                           <button className='uk-button uk-button-secondary' uk-toggle="target: #my-id" type="button">
                              <span data-uk-icon="icon: menu"></span>
                           </button>
                        {/* Render MB Offcanvas Menu */}
                        <div id="my-id" data-uk-offcanvas="">
                           <div className="uk-offcanvas-bar">
                              <button className="uk-offcanvas-close" type="button" data-uk-close=""></button>
                              <Menu/>
                           </div>
                        </div>
                     </>
                  }
               </div>
            </div>
         </div>
      </nav>
   )
}

export default Navbar;
