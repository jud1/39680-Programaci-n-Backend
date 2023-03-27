document.getElementById('loginBtn').addEventListener('click', async (evt) => {
   evt.preventDefault()
   const loginData = {
      email: document.getElementById('emailInput').value,
      password: document.getElementById('passwordInput').value
   }
   
   let validEmail = true
   let getAllValues = false
   if (loginData.email && loginData.password) getAllValues = true
   
   if (validEmail && getAllValues) {
      fetch("/api/session/login", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(loginData)})
         .then((response) => {
            if (!response.ok) throw new Error(response.statusText)
            return response.json()
         })
         .then((data) => {
            UIkit.modal.alert(`Login successful! Welcome ${loginData.email}`)
               .then(function() {
                  // Autentificar
                  // Redirigir al home
                  window.location.href = '/'
               })
         })
         .catch((error) => {
            UIkit.notification({ message: 'Invalid login fields', status: 'danger' });
          });

   }
   else UIkit.notification({ message: 'All fields are required', status: 'danger' })

})