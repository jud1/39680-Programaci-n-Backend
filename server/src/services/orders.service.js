// Dinamic import (DAO)
const path = process.env.SELECTEDBD === '1' ? '../models/mongodb/orders.model.js' : '../models/sequelize/orders.model.js'
const importedModule = await import(path)
const ordersModel = importedModule.default

const createOrder = async (order) => {
   try {
      const neworder = new ordersModel(order)
      await neworder.save()

      // Node mailer, resumen de la compra [AWAIT]
      
      return neworder
   }
   catch (error) {
      return error
   }
}

const findOrder = async (id) => {
   try {
      const order = await ordersModel.findById(id)
      return order
   }
   catch (error) {
      return error
   }
}

const updateOrder = async (id, modify) => {
   try {
      const updateOrder = await ordersModel.findByIdAndUpdate(id, modify, { new: true })

      // Node mailer, aviso de cambio de status [AWAIT]

      return updateOrder
   }
   catch (error) {
      return error
   }
}

export { createOrder, findOrder, updateOrder }