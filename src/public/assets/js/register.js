document.getElementById('registerBtn').addEventListener('click', async (evt) => {
   evt.preventDefault()

   // Form data (custom)
   const newUser = {
      username: document.getElementById('register_username').value,
      email: document.getElementById('register_email').value,
      password: document.getElementById('register_password').value,
      repassword: document.getElementById('register_repassword').value,
      name: document.getElementById('register_name').value,
      lastname: document.getElementById('register_lastname').value,
   }

   // Validations

   let validEmail = true
   let matchPassword = newUser.password === newUser.repassword ? true : false
   let getAllValues = false
   if (newUser.username && newUser.email && newUser.password && newUser.repassword && newUser.name && newUser.lastname) getAllValues = true

   // Exe
   if (validEmail && matchPassword && getAllValues) {
      const { repassword, ...newUserData } = newUser

      fetch("/api/users", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(newUserData)})
         .then((response) => {
            if (!response.ok) throw new Error(response.statusText)
            console.log(response)
            return response
         })
         .then((data) => {
            UIkit.modal.alert(`User Created`)
               .then(async () => {
                  // Autentificar
                  // Redirigir al home
                  window.location.href = '/session/login'
               })
         })
         .catch((error) => {
            console.error(error)
            UIkit.notification({ message: 'Error', status: 'danger' })
         })

   }
   else UIkit.notification({ message: 'Error', status: 'danger' })
})