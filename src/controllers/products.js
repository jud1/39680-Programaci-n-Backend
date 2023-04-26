import { findProducts, findProduct, createProduct, removeProduct, modifyProduct } from '../services/productsServices.js'

const getProducts = async(req, res) => {
   try {
      const products = await findProducts()
      res.status(200).send(products)
   }
   catch(error) {
      res.status(500).send('Error getting product', error)
   }
}

const getProduct = async(req, res) => {
   try {
      const product = await findProduct(req.params.id)
      res.status(200).send(product)
   }
   catch(error) {
      res.status(500).send('Error getting product', error)
   }
}

const postProduct = async(req, res) => {
   try {
      const {name, description, price} = req.body
      const newProduct = await createProduct({name, description, price})
      res.status(200).send(newProduct)
   }
   catch(error) {
      res.status(500).send('Error creating product', error)
   }
}

const deleteProduct = async(req, res) => {
   try {
      const product = await removeProduct(req.params.id)
      res.status(200).send(product)
   }
   catch(error) {
      res.status(500).send('Error deleting product', error)
   }
}

const updateProduct = async(req, res) => {
   try {
      const product = await modifyProduct(req.params.id, req.body)
      res.status(200).send(product)
   }
   catch(error) {
      res.status(500).send('Error updating product', error)
   }
}


export { getProducts, getProduct, postProduct, deleteProduct, updateProduct}