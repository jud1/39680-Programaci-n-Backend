import { Schema, model } from 'mongoose'

const cartsSchema = new Schema({
   products: {
      type: [
         {
            product: {
               type: Schema.Types.ObjectId,
               ref: "Products"
            },
            quantity: { type: Number }
         }
      ],
      default: []
   }
})

const cartsModel = model('Carts', cartsSchema)

export default cartsModel