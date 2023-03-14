const socket = io()
const chatBox = document.getElementById('chatBox')
const chatHistory = document.getElementById('chatHistory')
const charactersLength = document.getElementById('charactersLength')
let user

const sortFunction = (a, b) => {
   return Date.parse(a.date) > Date.parse(b.date) ? -1 : 1
}

chatBox.addEventListener('input', evt => {
   const val = evt.target.value.length
   const counter = 200 - Number(val)
   charactersLength.textContent = 200 - Number(val)
   if (counter<1) {
      chatBox.classList.add('uk-form-danger')
   } 
   else {
      chatBox.classList.remove('uk-form-danger')
   }
})

// Function to generate message nodes
const generateMessageNode = message => {
   const messageNode = document.createElement('li')
   const date = new Date(message.date)
   messageNode.innerHTML = `
      <small>${date.toLocaleString("es-CL")}</small>
      <br/> <strong> ${message.email}</strong> dice: 
      <br/> ${message.message}
   `
   return messageNode
}

// Function to update chat history
const updateChatHistory = data => {
   chatHistory.innerHTML = ""
   data.sort(sortFunction).forEach(message => {
      chatHistory.appendChild(generateMessageNode(message))
   })
}

// Load messages
socket.on('getInitialMessages', data => updateChatHistory(data))

const login = async() => {
   const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
      allowOutsideClick: false
   }) 
   user = email
}

login()

chatBox.addEventListener('keyup', evt => {
   if(evt.key === 'Enter' && chatBox.value.trim().length > 0 && evt.target.value.length> 200){
      Swal.fire({
         title: 'Error!',
         text: 'Characters limit exceed',
         icon: 'error',
         confirmButtonText: 'Ok'
      })
      /* .then(()=> {
         chatBox.setAttribute('maxlength', 200)
      }) */
   }
   else if (evt.key === 'Enter' && chatBox.value.trim().length > 0) {
      socket.emit("message", { email: user, message: chatBox.value, date: Date.now() })
      chatBox.value = ''
      chatBox.classList.remove('uk-form-danger')
      charactersLength.textContent=200
   }
})

// On update messages
socket.on('updatedMessages', data => updateChatHistory(data))