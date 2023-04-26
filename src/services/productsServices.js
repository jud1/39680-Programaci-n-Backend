import productsModel from '../models/productsModel.js'

// Get all
const findProducts = async () => {
   try {
      const products = await productsModel.find()
      return products
   }
   catch(error) {
      return error
   }
}

// Get one
const findProduct = async (id) => {
   try {
      const product = await productsModel.findById(id)
      return product
   }
   catch(error) {
      return error
   }
}

// Create one
const createProduct = async (product) => {
   try {
      const newProduct = new productsModel(product)
      await newProduct.save()
      return newProduct
   }
   catch(error) {
      return error
   }
}

const removeProduct = async (id) => {
   try {
      const product = await productsModel.findByIdAndDelete(id)
      return product
   }
   catch(error) {
      return error
   }
}

const modifyProduct = async (id, product) => {
   try {
      const updatedProduct = await productsModel.findByIdAndUpdate(id, product, {new: true})
      return updatedProduct
   }
   catch(error) {
      return error
   }
}

export { findProducts, findProduct, createProduct, removeProduct, modifyProduct}