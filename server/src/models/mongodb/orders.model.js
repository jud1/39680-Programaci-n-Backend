import { Schema, model } from 'mongoose'
import shortid from 'shortid'

const initialStatus = 'created'

const ordersSchema = new Schema({
   status: {
      type: String,
      default: initialStatus
   },
   code: {
      type: String,
      default: shortid.generate,
   },
   date: { 
      type: Date, 
      default: Date.now(),
   },
   purchaser: { 
      type: String,
      required: true,
   },
   resume: {
      type: Array,
      required: true
   },
   amount: {
      type: Number,
      required: true
   },
   updates: {
      type: [
         {
            status: {
               type: String,
               default: initialStatus
            },
            date: { 
               type: Date 
            }
         }
      ],
      default: [
         { status: initialStatus, date: Date.now() }
      ]
   },
   exceptions: {
      type: [
         {
            message: {
               type: String,
            },
            product: { 
               type: String 
            }
         }
      ],
      default: []
   }
})

const ordersModel = model('Orders', ordersSchema)

export default ordersModel