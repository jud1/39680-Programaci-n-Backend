import { MongoDBManager } from "../../../db/MongoDBManager.js"

const url = process.env.MONGODBURL

const schema = {
   email: { type: String, require: true, maxLength: 50 },
   message: { type: String, require: true, maxLength: 200 },
   date: { type: Date, require: true }
}

export class ManagerMessagesMongoDB extends MongoDBManager {
   constructor() {
      super(url, "messages", schema)
      // Atributos propios
   }
   // Metodos propios
}