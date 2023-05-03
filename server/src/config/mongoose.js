import mongoose from 'mongoose'

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODBURL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      })
      console.log('MongoDB connected')
   } catch (error) {
      console.error(error)
   }
}

export default connectDB