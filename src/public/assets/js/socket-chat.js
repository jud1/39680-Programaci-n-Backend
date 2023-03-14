const socket = io()
let user
const chatBox = document.getElementById('chatBox')
const chatHistory = document.getElementById('chatHistory')

// Load messages
socket.on('getInitialMessages', info => {
   info.forEach(message => {
      const messageNode= document.createElement('li')
      const date = new Date(message.date)
      messageNode.innerHTML = `
         <small>${date.toLocaleString("es-CL")}</small><br/>
         <strong> ${message.email}</strong> dice:
         <br/> ${message.message}
      `
      chatHistory.appendChild(messageNode)
   })
})

Swal.fire({
   title: 'Login',
   input: 'text',
   text: 'email',
   confirmButtonText: 'Go',
   inputValidator: email => {
      return !email && 'Use a valid email'
   },
   allowOutsideClick: false
}).then(result => {
   user = result.value
})

chatBox.addEventListener('keyup', evt => {
   evt.preventDefault()
   if(evt.key === 'Enter' && chatBox.value.trim().length > 0){
      socket.emit("message", { email: user,  message: chatBox.value, date: Date.now()})
      chatBox.value=''
   }
})

socket.on('updatedMessages', info => {
   chatHistory.innerHTML = ""
   info.forEach(message => {
      const messageNode = document.createElement('li')
      const date = new Date(message.date)
      messageNode.innerHTML = `
         <small>${date.toLocaleString()}</small><br/>
         <strong> ${message.email}</strong> dice:
         <br/> ${message.message}
      `
      chatHistory.appendChild(messageNode)
   })
})