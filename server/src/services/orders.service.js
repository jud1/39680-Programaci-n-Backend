import { findCart, emptyCart } from "./cartsServices.js"
import nodemailer from 'nodemailer'

// Dinamic import (DAO)
const path = process.env.SELECTEDBD === '1' ? '../models/mongodb/orders.model.js' : '../models/sequelize/orders.model.js'
const importedModule = await import(path)
const ordersModel = importedModule.default

const createOrder = async (user) => {
   try {
      // Define order object
      const purchaser = user.id
      const exceptions = []
      const cart = await findCart(user.id_cart.toString())

      // Error on stock [A]: This method return an array with the products with insufficient stock, not being used yet, its more informative to the user but its no required by the homework
      /* const productsWithError = cart.products.filter(item => item.product.stock < item.quantity)
      if (productsWithError.length > 0) {
         // Exit and not create order
         console.log(productsWithError)
         throw new Error('Not stock')
      } */

      // Error on stock [B]: Instead, this method takes all products with insufficient stock and update the quantity to the max available, then update the cart and create the order (if product is not available, it will be removed from the cart)
      cart.products.forEach(item => {
         if(item.product.stock === 0) {
            cart.products.splice(cart.products.indexOf(item), 1)
            exceptions.push(
               {
                  product: item.product._id,
                  message: `Product "${item.product.name}" is not available, delete from the final order`
               }
            )
         }
         else if(item.product.stock < item.quantity) {
            item.quantity = item.product.stock
            exceptions.push(
               {
                  product: item.product._id,
                  message: `Product "${item.product.name}" has insufficient stock, quantity decreased to ${item.product.stock} and updated in the final order`
               }
            )
         }
      })

      const resume = cart.products.map(item => {
         return {
            product: item.product._id,
            quantity: item.quantity,
            pricePurcharsed: item.product.price
         }
      })


      const amount = cart.products.reduce((acc, item) => acc + item.quantity * item.product.price, 0)
      const order = { purchaser, resume, amount, exceptions }

      // Create order
      const neworder = new ordersModel(order)
      await neworder.save()

      // Empty cart
      // emptyCart(user.id_cart.toString())

      // Node mailer, resumen de la compra [AWAIT]
      const transporter = nodemailer.createTransport({
         service: 'gmail',
         port: 587,
         auth: {
            user: process.env.GMAILSENDERUSER,
            pass: process.env.GMAILSENDERPASS
         }
      })

      await transporter.sendMail({
         from: process.env.GMAILSENDERUSER,
         to: user.email,
         subject: 'Order resume',
         html: `
            <h1>Order resume</h1>
            <p>Order ID: ${neworder.code}</p>
            <p>Order amount: ${neworder.amount}</p>
            <p>Order status: ${neworder.status}</p>
            <p>Order date: ${neworder.date}</p>
         `
      })

      // Return order
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