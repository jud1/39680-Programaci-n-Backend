const removeButtons = document.querySelectorAll('.delete-button')
const cartId = document.getElementById('lista_productos').getAttribute('data-id')
console.log(cartId)

const deleteProduct = async id => {
   try {
      const response = await fetch(`/api/carts/${cartId}/product/${id}`, {
         method: 'DELETE'
      })
      if (response.ok) {
         location.reload();
      } 
      else {
         throw new Error('La solicitud DELETE no fue exitosa');
      }
   }
   catch (error) {
      console.log(error)
   }
}

removeButtons.forEach(button => {
   button.addEventListener('click', evt => {
      const pid = evt.target.getAttribute('id')
      deleteProduct(pid)
   })
})