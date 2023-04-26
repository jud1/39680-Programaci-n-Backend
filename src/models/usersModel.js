import { Schema, model } from 'mongoose'

const usersSchema = new Schema({
   first_name: {
      type: String,
      required: true
   },
   last_name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      unique: true,
      index: true
   },
   age: {
      type: Number,
      required: true
   },
   rol: {
      type: String,
      default: "user"
   },
   password: {
      type: String,
      required: true
   }
})

const usersModel = model("Users", usersSchema)

export default usersModel