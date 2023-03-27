const socket = io()

socket.emit('msgCliente', 'Cliente conectado')

socket.on('msgServer', mensaje => {
   console.log(mensaje)
})

const nodoListaProductos = document.getElementById('lista_productos')

socket.on('getUpdtProds', productos => {
   // Vaciamos la lista
   nodoListaProductos.innerHTML = null
   // console.log(productos)
   // Por cada item agremos un div
   productos.forEach((producto) => {
      const li = document.createElement('li')
      // li.setAttribute('id', producto.id)
      li.innerHTML = `
         <div class="uk-card uk-card-default">
            <div class="uk-card-header">
               <div class="uk-grid-small uk-flex-middle" uk-grid="">
                  <div class="uk-width-expand">
                     <h3 class="uk-card-title uk-margin-remove-bottom">${producto.name}</h3>
                     <p class="uk-text-meta uk-margin-remove-top">
                        ${producto.price} - stock:${producto.stock} - categoría: ${producto.category}
                     </p>
                  </div>
               </div>
            </div>
            <div class="uk-card-body">
               <p>${producto.description}</p>
            </div>
         </div>
      `
      nodoListaProductos.append(li)
   })
})


// Pagination

const newUrl = (key, value) => {
   const url = window.location.search
   const urlParams = new URLSearchParams(url)
   urlParams.set(key, value)
   return urlParams.toString()
}

const setFilterNavigation = (dataAtribute) => {
   const buttonNode = document.querySelector(`[${dataAtribute}]`)
   const atributte = buttonNode.getAttribute(dataAtribute)
   const key = dataAtribute.split("-")
   if(atributte) {
      buttonNode.addEventListener('click', evt => {
         evt.preventDefault()
         window.location.replace(
            `/?${newUrl(
               key[key.length-1],
               atributte)
            }`
         )
      })
   }
   else buttonNode.setAttribute('disabled', "")
}

// Apply to all buttons 
document.querySelectorAll('.nav-attribute').forEach(item=> {
   const attrArray = item.getAttributeNames()
   const attr = attrArray.find(atribute => atribute.includes('data-nav-'))
   setFilterNavigation(attr)
})