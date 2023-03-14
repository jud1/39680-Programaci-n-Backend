import { MongoDBManager } from "../../../db/MongoDBManager.js"

const schema = {
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
   }/* ,
   images: {
      default: ['default.jpg']
   } */
}

export class ManagerProductsMongoDB extends MongoDBManager {
   constructor() {
      super(process.env.MONGODBURL, "products", schema)
      // Atributos propios
   }
   // Metodos propios
}