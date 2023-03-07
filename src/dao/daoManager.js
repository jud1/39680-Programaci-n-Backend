const selectedBD = 1

// 1 es MongoDB, 2 es Postgresql
export const getManagerProducts = async () => {
   const modelProduct =  selectedBD === 1 
      ? await import('./MongoDB/models/Product.js')
         : await import('./Postgresql/models/Product.js')
   
   return modelProduct
}

// 1 es MongoDB, 2 es Postgresql
export const getManagerMessage = async () => {
   const modelMessage =  selectedBD === 1 
      ? await import('./MongoDB/models/Message.js')
         : await import('./Postgresql/models/Message.js')
   
   return modelMessage
}