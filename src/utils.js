import multer from "multer"

/* MULTER */
const uploadOptions = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, 'src/public/images')
   },
   filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
   }
})

export const upload = multer({storage: uploadOptions})