import { MongoDBManager } from "../../../db/MongoDBManager.js"

const url = process.env.MONGODBURL

const schema = {
   name: {type: String, require: true, max: 60},
   email: {type: String, require: true, max: 50},
   message: {type: String, require: true}
}

export class ProductDaoMongoDB extends MongoDBManager {
   constructor() {
      super(url, "products", schema)
      // Atributos propios
   }
   // Metodos propios
}