import { MongoDBManager } from "../../../db/MongoDBManager.js"

const url = process.env.MONGODBURL

const schema = {
   name: {type: String, require: true, max: 60},
   email: {type: String, require: true, max: 50},
   message: {type: String, require: true}
}

export class MessageDaoMongoDB extends MongoDBManager {
   constructor() {
      super(url, "messages", schema)
      // Atributos propios
   }
   // Metodos propios
}
ManagerMessageMongoDB