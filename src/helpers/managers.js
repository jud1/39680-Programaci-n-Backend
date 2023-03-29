import { getManagerProducts, getManagerCarts, getManagerMessages, getManagerUsers } from "../dao/daoManager.js"

// PRODUCTS
const dataProducts = await getManagerProducts()
const managerProducts = new dataProducts.ManagerProductsMongoDB

// CARTS
const dataCarts = await getManagerCarts()
const managerCarts = new dataCarts.ManagerCartsMongoDB

// CARTS
const dataMessages = await getManagerMessages()
const managerMessages = new dataMessages.ManagerMessagesMongoDB

// USERS
const dataUsers = await getManagerUsers()
const managerUsers = new dataUsers.ManagerUsersMongoDB

export { managerProducts, managerCarts, managerMessages, managerUsers }