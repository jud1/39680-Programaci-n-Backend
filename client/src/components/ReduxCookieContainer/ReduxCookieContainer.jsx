import cookieAndRedux from "../../utils/cookieAndRedux.js"

const ReduxCookieContainer = ({children}) => {
   cookieAndRedux()
   return (
      <>
         {children}
      </>
   )
}

export default ReduxCookieContainer
