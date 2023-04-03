document.getElementById('registerBtn').addEventListener('click', async (evt) => {
   evt.preventDefault()

   // Form data (custom)
   const newUser = {
      email: document.getElementById('register_email').value,
      completename: document.getElementById('register_completename').value,
      password: document.getElementById('register_password').value,
      repassword: document.getElementById('register_repassword').value,
   }

   // Validations

   let validEmail = true
   let matchPassword = newUser.password === newUser.repassword ? true : false
   let getAllValues = false
   if (newUser.completename && newUser.email && newUser.password && newUser.repassword) getAllValues = true

   // Exe
   if (validEmail && matchPassword && getAllValues) {
      const { repassword, ...newUserData } = newUser

      fetch("/api/users/register", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(newUserData)
      })
         .then((response) => {
            if (!response.ok) throw new Error(response.statusText)
            return response
         })
         .then((data) => {
            window.location.href = '/'
         })
         .catch((error) => {
            if (error.response && error.response.body && error.response.body.error) {
               UIkit.notification({ message: error.response.body.error, status: 'danger' });
            } else {
               UIkit.notification({ message: 'Error creating user', status: 'danger' });
            }
         });

   }
   else UIkit.notification({ message: 'Error', status: 'danger' })
})