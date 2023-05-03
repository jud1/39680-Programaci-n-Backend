const Main = (props) => {
   return (
      <main className="uk-margin-medium-bottom" data-uk-height-viewport="offset-top: true; offset-bottom: true" data-uk-margin="margin: uk-margin-medium-top">
         <div className="uk-alert-warning" data-uk-alert="">
            <p className="uk-container">
               <span data-uk-icon="icon: warning"></span>
               <span> Some components are of construction</span>
            </p>
         </div>
         {props.children}
      </main>
   )
}

export default Main;
