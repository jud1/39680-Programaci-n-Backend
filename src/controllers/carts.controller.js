import { managerCarts, managerProducts } from "../helpers/managers.js"

/* Functions */

// Get all
const getCarts = async (req, res) => {
   res.send(await managerCarts.getElements())
}

// Add cart
const createCart = async (req, res) => {
   await managerCarts.addElements()
   // Defaut res
   res.send('Cart created')
}

// Get cart
const getCart = async (req, res) => {
   res.send(await managerCarts.getElementById(req.params.id))
}

// Add product on cart
const addProductOnCart = async (req, res) => {
   let cart = await managerCarts.getElementById(req.params.cid)
   const quantityParam =  req.body.quantity

   const incomingProduct = await managerProducts.getElementById(req.params.pid)

   // Invalid product
   if (!incomingProduct) res.send('Invalid product')

   // If the product exist on cart already
   else if(incomingProduct && cart.products.some(item => item.product.toString() === incomingProduct.id)) {
      const productModify = cart.products.find(item => item.product.toString() === incomingProduct.id)
      productModify.quantity = quantityParam ? quantityParam : productModify.quantity + 1
      await managerCarts.updateElement(req.params.cid, cart)
      res.send('Product quantity modify on the cart')
   }
   else if(incomingProduct) {
      const newProduct = { product: req.params.pid, quantity: quantityParam ? quantityParam : 1  }
      cart.products.push(newProduct)
      await managerCarts.updateElement(req.params.cid, cart)
      res.send('Product added to the cart')
   }
}

// Delete product on cart
const deleteProductOnCart = async (req, res) => {
   // Aux for the original cart
   const aux = await managerCarts.getElementById(req.params.cid)
   
   // aux for the filtered car without the product to delete
   const updateCart = aux.products.filter(item => item.product.toString() !== req.params.pid)
   
   // Update de array products of cart
   await managerCarts.updateElement(req.params.cid, { $set: { products: updateCart }})
   
   // Defaut res
   res.send('Product remove from the cart successful')
}

// Update cart
const updateCart = async (req, res) => {
   await managerCarts.updateElement(req.params.id, {$set: { products: req.body }}) // get a custom cart products array from req-body

   // Defaut res
   res.send('Cart update custom')
}

// Delete all products on cart
const emptyCart = async (req, res) => {
   await managerCarts.updateElement(req.params.id, {$set: { products: [] }})

   // Defaut res
   res.send('Cart is now empty')
}

export { getCarts, createCart, getCart, addProductOnCart, deleteProductOnCart, updateCart, emptyCart }