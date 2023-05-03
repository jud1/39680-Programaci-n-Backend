import { Schema, model } from 'mongoose'

const usersSchema = new Schema({
   email: { 
      type: String, 
      require: true, 
      maxLength: 70, 
      unique: true
   },
   password: { 
      type: String, 
      require: true,
   },
   firstname: {
      type: String, 
      maxLength: 40,
      required: true
   },
   lastname: {
      type: String, 
      maxLength: 40,
      required: true
   },
   date: { 
      type: Date, 
      default: Date.now(),
      inmutable: true
   },
   birthday: {
      type: Date, 
      default: null
   },
   avatar: {
      type: String, 
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
   },
   role: {
      type: String, 
      default: "user", 
      enum: ["user", "admin"]
   },
   phone: {
      type: String,
      default: null
   },
   id_cart: {
      type: Schema.Types.ObjectId,
      ref: "Carts",
      required: true
   }
})

const usersModel = model("Users", usersSchema)

export default usersModel