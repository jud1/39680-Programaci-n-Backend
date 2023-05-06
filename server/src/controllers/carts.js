import { createCart, findCart, findCarts, addProduct, removeProduct, emptyCart } from '../services/cartsServices.js'

const postCart = async (req, res) => {
   try {
      const newCart = await createCart()
      res.status(200).send(newCart)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

const getCartById = async (req, res) => {
   try {
      const cart = await findCart(req.params.id)
      res.status(200).send(cart)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

const getMyCart = async (req, res) => {
   try {
      const cart = await findCart(req.user.id_cart)
      res.status(200).send(cart)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

const getAllCarts = async (req, res) => {
   try {
      const carts = await findCarts()
      res.status(200).send(carts)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

const putProductOnCart = async (req, res) => {
   try {
      const updatedCart = await addProduct(req.params.id, req.params.pid)
      res.status(200).send(updatedCart)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

const addProductOnCart = async (req, res) => {
   try {
      const updatedCart = await addProduct(req.user.id_cart, req.body.pid)
      if(updatedCart.name === 'Error') throw new Error(updatedCart.message)
      res.status(200).send(updatedCart)
   }
   catch (error) {
      res.status(500).send(error)
   }
}

const removeProductCart = async (req, res) => {
   try {
      console.log(req.user.id_cart)
      console.log(req.body.pid)
      const updatedCart = await removeProduct(req.user.id_cart, req.body.pid)
      console.log(updatedCart)
      res.status(200).send(updatedCart)
   }
   catch (error) {
      res.status(500).send('Error creating cart')
   }
}

const deleteProductFromCart = async (req, res) => {
   try {
      const updatedCart = await removeProduct(req.params.id, req.params.pid)
      res.status(200).send(updatedCart)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

const deleteAllProductsFromCart = async (req, res) => {
   try {
      const updatedCart = await emptyCart(req.params.id)
      res.status(200).send(updatedCart)
   }
   catch (error) {
      res.status(500).send('Error creating cart', error)
   }
}

export { postCart, getCartById, getMyCart, getAllCarts, putProductOnCart, addProductOnCart, deleteProductFromCart, removeProductCart, deleteAllProductsFromCart }