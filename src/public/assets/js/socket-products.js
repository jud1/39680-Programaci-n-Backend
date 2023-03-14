const socket = io()

socket.emit('msgCliente', 'Cliente conectado')

socket.on('msgServer', mensaje => {
   console.log(mensaje)
})


const nodoListaProductos = document.getElementById('lista_productos')

socket.on('getUpdtProds', productos => {
   // Vaciamos la lista
   nodoListaProductos.innerHTML = null
   console.log(productos)
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
