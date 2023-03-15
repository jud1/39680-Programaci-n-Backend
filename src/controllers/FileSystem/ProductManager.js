import { writeFileSync, readFileSync, unlinkSync } from 'fs'

const consoleSeparate = "\n-------------------------"

class ProductManage {   
   constructor(path){
      this.path = path
      this.products = [],
      this.requiredParams = ["title", "description", "code", "price", "status", "stock", "category", "thumbnails"]
   }
   
   static id = 0

   // Ejecutaremos en todos los metodos que lo requieren en caso de ser llamados primeros
   createFileIf = async () => {
      try{
         // No hace nada, porque existe el archivo
         readFileSync(this.path, 'utf-8')
      }
      catch {
         // Crea el archivo ya que no existe, genera un arr vacio 
         const emptyData = []
         writeFileSync(this.path, JSON.stringify(emptyData))
      } 
   }

   verifyStaticId = async () => {
      await this.createFileIf()
      let fileArr = await this.getProducts()
      if(fileArr.length>0) {
         let acumulativo = 0
         fileArr.forEach(item=>{
            item.id>acumulativo ? acumulativo = item.id : false
         })
         ProductManage.id = acumulativo
      }
   }

   aplicateLimit = (products, limit) => {
      /* Aplicamos el limite al array */
      let aux = products

      // Si el limite no esta definido, pasamos sin limite
      if (limit === undefined) {}
      
      // Si el limite es un string vacio o NaN, error
      else if(limit==='' || isNaN(limit)) {
         aux = 'Límite invalido'
      }

      // Si el limite es menor a 1
      else if (limit < 1) {
         aux = 'El límite no puede ser menor a 1'
      }

      // Si el limite excede el tamaño del array
      else if(limit > aux.length) {
         aux = 'Límite excedido'
      }

      // Limite correcto, se aplica
      else {
         aux = aux.slice(0, limit)
      }

      return aux
   }

   // Metodo de ayuda
   deleteFile = async () => {
      unlinkSync(this.path)
   }

   // Devolvemos el array
   getProducts = async (limit) => {
      
      await this.createFileIf()
      
      let products = readFileSync(this.path, 'utf-8')
      products = JSON.parse(products)
      
      if(limit) products = this.aplicateLimit(products, limit)

      return products

   }

   // Find para arojar el match del id en el array (al ser unico no hay posiblidad de que hayan 2 en el array). EL ID DEBERIA SER NUMERO
   getProductById = async pid => {
      let products = await this.getProducts()
      products = products.find(item=> item.id === Number(pid))  
      return products ? products : 'Producto no encontrado'
   }

   // Agregar producto
   addProduct = async (product) => {
      
      await this.createFileIf()

      let products = await this.getProducts()

      // Campos default si no vienen
      product.status === undefined ? product.status = true : false 
      product.thumbnails === undefined ? product.thumbnails = ["default.jpg"] : false 

      // Preguntamos por todos los parametros requeridos, si falta alguno entramos al error
      if(!this.requiredParams.every(item => Object.keys(product).includes(item))){
         console.error('Debes ingresar todos los parámetros', consoleSeparate)
      }

      // Evitar que la propiedad "code" del producto no se repita (propiedad unica)
      else if(products.some(item => item.code === product.code)){
         console.error('El "code" ya está siendo utilizado por otro producto', consoleSeparate)
      }

      // No hay errores, agregar producto
      else {
         ProductManage.id+=1
         products.push({id: ProductManage.id, ...product})
         writeFileSync(this.path, JSON.stringify(products))
      }
   }

   // Modificar producto
   updateProduct = async (pid, product) => {
      let products = await this.getProducts() 

      // Si no llega body
      if(typeof product !== 'object') console.log('Body no valido')
      
      // Si llega un objeto sin propiedades
      else if (Object.keys(product).length < 1) console.log('Body sin propiedades')
      
      // Si alguna propiedad es id, id es unico y no se puede modificar
      else if(Object.keys(product).includes('id')) {
         console.log('La propiedad id no se puede modificar')
      }

      // Si una propiedad del objeto que llega no coincide con las del producto
      else if (!Object.keys(product).every(item => this.requiredParams.includes(item))) {
         console.log('Alguna propiedad no es correcta')
      }
      
      // Si alguna propiedad es code, code es unico y no se puede modificar
      else if(Object.keys(product).includes('code')) {
         console.log('La propiedad code no se puede modificar')
      }
      
      // Si no exixste algun producto con el id que llega por paramatro
      else if (!products.some(item=> item.id === Number(pid))) {
         console.log('id invalido')
      }

      // Body e id es valido, modifiquemos el producto
      else {
         // Nuevo array para guardar en el json, sin el producto modificado
         const oldProduct = products.find(item=> item.id === Number(pid))
         const updatedProduct = {...oldProduct, ...product} 
         
         products = products.filter(item => item.id !== Number(pid))
         products = [...products, updatedProduct]
         
         writeFileSync(this.path, JSON.stringify(products))
      }
   }

   // Eliminar producto
   deleteProduct = async (pid) => {
      let fileArr = await this.getProducts()
      const valido = await this.getProductById(pid)
      if (valido === 'Producto no encontrado'){
         console.log('No se puede eliminar el producto ya que no existe')
      }
      else {
         fileArr = fileArr.filter(producto => producto.id !== pid)
         writeFileSync(this.path, JSON.stringify(fileArr))
      }
   }
}

export default ProductManage