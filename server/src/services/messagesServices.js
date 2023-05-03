// Dinamic import (DAO)
const path = process.env.SELECTEDBD === '1' ? '../models/mongodb/messagesModel.js' : '../models/sequelize/messagesModel.js'

const importedModule = await import(path)
const messagesModel = importedModule.default

// Create one
const createMessage = async (message) => {
   try {
      const newMessage = new messagesModel(message)
      await newMessage.save()
      return newMessage
   }
   catch(error) {
      return error
   }
}

// Get all
const findMessages = async () => {
   try {
      const messages = await messagesModel.find()
      return messages
   }
   catch(error) {
      return error
   }
}

/* const findPaginatedMessages = async (queryParams) => {
   let { limit, page, sort, ...query } = queryParams
   !limit && (limit = 10)
   !page && (page = 1)
   sort = queryParams.sort ? [["price", queryParams.sort]] : null

   try {
      const products = await productsModel.paginate(query, {limit, page, sort})
      return products
   }
   catch(error) {
      return error
   }
} */

export { createMessage, findMessages }