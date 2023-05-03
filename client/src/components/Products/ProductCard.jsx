import Button from '../Button/Button'

const ProductCard = (props) => {
   const { name, description, price, sku, status, stock, category } = props.props
   return (
      <div className="uk-card uk-card-default">
         <div className="uk-card-header">
            <div className="uk-grid-small uk-flex-middle" uk-grid="">
               <div className="uk-width-auto">{/* <img className="uk-border-circle" width="40" height="40" src="images/avatar.jpg" alt="Avatar"> */}</div>
               <div className="uk-width-expand">
                  <h3 className="uk-card-title uk-margin-remove-bottom">{name}</h3>
                  <p className="uk-text-meta uk-margin-remove-top">
                     <small>Stock: {stock} | </small>
                     <small>Sku: {sku}</small>
                  </p>
               </div>
            </div>
         </div>
         <div className="uk-card-body">
            <h5>${price}</h5>
            <p>{description}</p>
         </div>
         <div className="uk-card-footer">
            <Button style='primary'>ADD</Button>
         </div>
      </div>
   )
}

export default ProductCard
