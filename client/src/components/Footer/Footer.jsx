import { useState } from "react"

const Footer = () => {
   const [year] = useState(new Date().getFullYear())

   return (
      <footer className="uk-background-secondary uk-padding-small uk-padding-remove-horizontal uk-light">
         <div className="uk-container">
            {year} - Lorem ipsum dolor sit amet consectetur adipisicing elit.
         </div>
      </footer>
   )
}

export default Footer
