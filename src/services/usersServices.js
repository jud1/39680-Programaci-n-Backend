import usersModel from '../models/usersModel.js'
import { createCart } from './cartsServices.js'

// Get all
const findUsers = async () => {
   try {
      const users = await usersModel.find()
      return users
   } catch (error) {
      return error
   }

}

// Get one
const findUserById = async (id) => {
   try {
      const user = await usersModel.findById(id)
      return user
   } catch (error) {
      return error
   }

}

// Find by email
const findUserByEmail = async (email) => {
   try {
      const user = await usersModel.findOne({ email: email })
      return user
   } catch (error) {
      return error
   }

}

// Create one
const createUser = async (user) => {
   try {
      // Create cart 
      const newCart = await createCart()
      // And assing to user
      const newUser = new usersModel({...user, id_cart: newCart._id})
      // Save the user
      await newUser.save()
      // Return the user
      return newUser
   } catch (error) {
      return error
   }
}

export { findUsers, findUserById, findUserByEmail, createUser }