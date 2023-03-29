import { MongodbManager } from "../db/MongodbManager.js"

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
   }
}

export class ManagerProductsDao extends MongodbManager {
   constructor() {
      super(process.env.MONGODBURL, "products", schema)
   }
   getElementsPaginate = async queryParams => {
      let { limit, page, sort, ...query } = queryParams
      !limit && (limit = 10)
      !page && (page = 1)
      sort = queryParams.sort ? [["price", queryParams.sort]] : null
      await this.setConnection()

      try {
         const elements = await this.model.paginate(query, {limit, page, sort})
         return elements
      }
      catch(error){
         res.send(error)
      }
   }
   // Metodos propios
}