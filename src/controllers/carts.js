import { createCart, findCart, findCarts, addProduct, removeProductOnCart, emptyCart } from '../services/cartsServices.js'

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

const deleteProductFromCart = async (req, res) => {
   try {
      const updatedCart = await removeProductOnCart(req.params.id, req.params.pid)
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

export { postCart, getCartById, getAllCarts, putProductOnCart, deleteProductFromCart, deleteAllProductsFromCart }