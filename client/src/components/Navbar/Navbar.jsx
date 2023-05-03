import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import Navigation from '../Navigation/Navigation'
import Logo from '../Logo/Logo'
import UserStatus from './UserStatus'

const Navbar = () => {
   const [mbsize] = useState(959)
   const [windowWidth, setWindowWidth] = useState(window.innerWidth)
   const handleResize = () => {
      setWindowWidth(window.innerWidth)
   }
   useEffect(() => {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
   }, [])


   return (
      <nav className="uk-navbar-container">
         <div className="uk-container">
            <div data-uk-navbar="mode: click">
               {/* Logo (Always render) */}
               <div className="uk-navbar-left uk-margin-right">
                  <Link className="uk-navbar-item uk-logo" to="/" aria-label="Back to Home">
                     <Logo/>
                  </Link>
                  <UserStatus/>
                  
               </div>
               { windowWidth > mbsize ?
                  <>
                     {/* DESKTOP */}
                     <div className="uk-navbar-right">
                        <Navigation/>
                     </div>
                  </>
                  :
                  <>
                     {/* MOBILE */}
                     {/* This is a button toggling the off-canvas */}
                     <div className="uk-navbar-right">
                        <button className='uk-button uk-button-secondary' uk-toggle="target: #my-id" type="button">
                           <span data-uk-icon="icon: menu"></span>
                        </button>
                     </div>

                     {/* This is the off-canvas */}
                     <div id="my-id" data-uk-offcanvas="">
                        <div className="uk-offcanvas-bar">
                           <button className="uk-offcanvas-close" type="button" data-uk-close=""></button>
                           <Navigation/>
                        </div>
                     </div>
                  </> 
               }
            </div>
         </div>
      </nav>
   )
}

export default Navbar;
