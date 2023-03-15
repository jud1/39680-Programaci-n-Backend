import { Router } from "express"
import { upload } from "../utils.js"

const uploadRouter = Router()

uploadRouter.post('/', upload.single('product'), (req, res) => {
   res.send('image uploaded successful')
})

export default uploadRouter