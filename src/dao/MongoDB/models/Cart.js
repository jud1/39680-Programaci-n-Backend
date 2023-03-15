import { MongoDBManager } from "../../../db/MongoDBManager.js"

const schema = {
   products: {
      type: Array,
      require: true,
      default: []
   }
}

export class ManagerCartsMongoDB extends MongoDBManager {
   constructor() {
      super(process.env.MONGODBURL, "carts", schema)
      // Atributos propios
   }
   // Metodos propios
}