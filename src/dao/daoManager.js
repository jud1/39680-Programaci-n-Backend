// 1 es MongoDB, 2 es Postgresql
export const getManagerProducts = async () => {
   const modelProduct = process.env.SELECTEDBD === "1"
      ? await import('./MongoDB/models/Product.js')
      : await import('./Postgresql/models/Product.js')

   return modelProduct
}

// 1 es MongoDB, 2 es Postgresql
export const getManagerMessages = async () => {
   const modelMessage = process.env.SELECTEDBD === "1"
      ? await import('./MongoDB/models/Message.js')
      : await import('./Postgresql/models/Message.js')

   return modelMessage
}

// 1 es MongoDB, 2 es Postgresql
export const getManagerCarts = async () => {
   const modelCart = process.env.SELECTEDBD === "1"
      ? await import('./MongoDB/models/Cart.js')
      : await import('./Postgresql/models/Cart.js')

   return modelCart
}