import { Schema, model } from 'mongoose'
import mongoosePaginate from "mongoose-paginate-v2"

const productsSchema = new Schema({
   name: {
      type: String,
      require: true,
      max: 60 
   },
   description: {
      type: String,
      require: true,
      max: 200 
   },
   sku: {
      type: String,
      max: 20,
      require: true,
      unique: true
   },
   price: {
      type: Number,
      require: true
   },
   stock: {
      type: Number,
      require: true
   },
   status: {
      type: Boolean,
      default: true
   },
   category: {
      type: String,
      max: 20,
      default: 'default'
   }
})

productsSchema.plugin(mongoosePaginate)

const productsModel = model('Products', productsSchema)

export default productsModel