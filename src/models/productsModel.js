import { Schema, model } from 'mongoose'

const productsSchema = new Schema({
   name: {
      type: String,
      required: true,
   },
   description: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   }
})

const productsModel = model('Products', productsSchema)

export default productsModel