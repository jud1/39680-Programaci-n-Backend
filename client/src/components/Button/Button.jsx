const Button = (props) => {
   return (
      <button 
         onClick={props.onClick}
         className={
            'uk-button '
            +(props.style ? `uk-button-${props.style}` : 'uk-button-default')
            +(props.size ? ` uk-button-${props.size}` : '')
      }>
         {props.children}
      </button>
   )
}

export default Button
