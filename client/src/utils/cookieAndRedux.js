import Cookies from "js-cookie"
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from '../store.js'
import fetchCookie from "./fetchCookie.js"

const cookieAndRedux = async () => {
   const cookie = Cookies.get(import.meta.env.VITE_COOKIE_SESSION_NAME)
   const dispatch = useDispatch()

   if (cookie) {
      const data = await fetchCookie()
      dispatch(setUser(data))
   }
   
   else dispatch(clearUser())
}

export default cookieAndRedux