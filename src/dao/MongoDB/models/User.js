import { MongodbManager } from "../db/MongodbManager.js"

const url = process.env.MONGODBURL

const schema = {
   email: { 
      type: String, require: true, maxLength: 71, unique: true
   },
   password: { 
      type: String, require: true,
   },
   completename: {
      type: String, require: true, maxLength: 80, unique: true
   },
   date: { 
      type: Date, default: Date.now()
   },
   birthday: {
      type: Date, default: null,
   },
   avatar: {
      type: String, default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
   },
   role: {
      type: String, default: "user", enum: ["user", "admin", "superadmin"], immutable: true
   }
}

export class ManagerUsersDao extends MongodbManager {
   constructor() {
      super(url, "users", schema)
      // Atributos propios
   }
   // Metodos propios
   findUserByEmail = async email => {
      await this.setConnection()
      try {
         const user = await this.model.findOne({email: email})
         return user
      }
      catch (error) { res.send(error) }
   }
}