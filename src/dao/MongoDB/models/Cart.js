import { MongodbManager } from "../db/MongodbManager.js"
import mongoose from "mongoose"

const schema = {
   products: {
      type: [
         {
            product: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "products"
            },
            quantity: { type: Number }
         }
      ],
      default: []
   }
}

export class ManagerCartsDao extends MongodbManager {
   constructor() {
      super(process.env.MONGODBURL, "carts", schema)
      // Atributos propios
   }
   // Metodos propios
}