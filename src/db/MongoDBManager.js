import mongoose from "mongoose"

export class MongoDBManager {
   constructor(url, collection, schema) {
      this.url = url // Esta propiedad deberia ser privada
      this.collection = collection
      this.schema = new mongoose.Schema(schema)
      this.model = mongoose.model(this.collection, this.schema)
   }

   setConnection = async () => { // Arrow function
      try {
         await mongoose.connect(this.url)
         console.log('MongoDB is conected')
      }
      catch (error){
         console.log(`MongoDB error on connection: ${error}`)   
      }
   }

   async getElements() {
      try {
         const elements = await this.model.find()
         return elements
      }
      catch(error) {
         console.log(`MongoDB error on read all elements: ${error}`)
      }
   }

   async getElementsById(id) {
      try {
         const element = await this.model.findById(id)
         return element
      }
      catch(error) {
         console.log(`MongoDB error on get an element: ${error}`)
      }
   }
   
   async addElements(elements) { // Agrega uno o varios elementos
      try {
         const message = await this.model.insertMany(elements)
         return message
      }
      catch(error) {
         console.log(`MongoDB error on create an element(s): ${error}`)
      }
   }

   async updateElement(id, info) {
      try {
         const message = await this.model.findByIdAndUpdate(id, info)
         return message
      }
      catch(error) {
         console.log(`MongoDB error on update an element: ${error}`)
      }
   }
   
   async deleteElement(id) {
      try {
         const response = await this.model.findByIdAndRemove(id)
         return response
      }
      catch(error) {
         console.log(`MongoDB error on delete an element: ${error}`)
      }
   }
}