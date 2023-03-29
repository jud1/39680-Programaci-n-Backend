import { Router } from "express"
import { upload } from "../../utils.js"

const uploadsRouter = Router()

uploadsRouter.post('/', upload.single('product'), (req, res) => {
   res.send('image uploaded successful')
})

export default uploadsRouter