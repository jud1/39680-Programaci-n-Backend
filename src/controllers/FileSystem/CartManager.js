import { writeFileSync, readFileSync, unlinkSync } from 'fs'
import ProductManage from './ProductManager.js'

const products = new ProductManage('src/models/products.json')

class CartManager {   
   constructor(path){
      this.path = path
      this.products = []
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

   // fn auxuliar para no repetir los ids ya que static se reinicia en cada reinicio del servidor
   verifyStaticId = async () => {
      await this.createFileIf()
      let fileArr = await this.getCarts()
      if(fileArr.length>0) {
         let acumulativo = 0
         fileArr.forEach(item=>{
            item.id>acumulativo ? acumulativo = item.id : false
         })
         CartManager.id = acumulativo
      }
   }

   // Obtenemos todos los carro
   getCarts = async () => {
      await this.createFileIf()
      let carts = readFileSync(this.path, 'utf-8')
      carts = JSON.parse(carts)
      return carts
   }

   // Agregamos un carro (vacio)
   addCart = async () => {
      await this.createFileIf()
      let carts = await this.getCarts()
      CartManager.id+=1
      carts.push({id: CartManager.id, products: []})
      writeFileSync(this.path, JSON.stringify(carts))
   }

   // Obtenemos un solo carro
   getCartById = async (cid) => {
      await this.createFileIf()
      const carts = await this.getCarts()
      const cart = carts.find(item => item.id === cid)
      return cart
   }

   // Agregamos un producto a un carro
   addProductOnCart = async (cid, pid) => {
      await this.createFileIf()
      let carts = await this.getCarts()
      let auxProducts = await products.getProducts()
      const cart = carts.find(item=> item.id ===cid)
      const product = auxProducts.find(item=> item.id ===pid)
      
      // Si algunos de los id es indefinido
      if(cart === undefined || product === undefined){
         console.log("algun id es indefinido")
      }
      
      // Si ya existe, aumentamos el id
      else if (cart.products.some(item=> item.id ===pid)) {
         cart.products.find(item=>item.id === pid).quantity += 1
         carts = carts.filter(item => item.id !== cid)
         carts.push(cart)
         writeFileSync(this.path, JSON.stringify(carts))
      }

      // si no existia, agreguemoslo al carro
      else {
         cart.products.push({id: pid, quantity: 1})
         carts = carts.filter(item => item.id !== cid)
         carts.push(cart)
         writeFileSync(this.path, JSON.stringify(carts))
      }

   }

}

export default CartManager