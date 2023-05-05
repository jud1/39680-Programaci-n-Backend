import { Schema, model } from 'mongoose'

const messagesSchema = new Schema({
   user_id: { 
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true
   },
   user_email: { 
      type: Schema.Types.String,
      ref: "Users",
      required: true
   },
   message: { 
      type: String, 
      require: true, 
      maxLength: 200 
   },
   date: { 
      type: Date, 
      default: Date.now(),
   }
})

const messagesModel = model('Messages', messagesSchema)

export default messagesModel