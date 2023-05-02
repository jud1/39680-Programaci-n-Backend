const whiteList = ['http://localhost:8000', 'http://localhost:8080', 'http://localhost:5173/','chrome-extension://aicmkgpgakddgnaphhhpliifpcfhicfo']

const corsOptions = {
   origin: (origin, callback) => {
      if (whiteList.indexOf(origin) !== -1) {
         callback(null, true)
      } else {
         callback(new Error('Not allowed by Cors'))
      }
   }
}

export default corsOptions