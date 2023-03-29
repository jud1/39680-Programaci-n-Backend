import { getManagerProducts, getManagerCarts, getManagerMessages, getManagerUsers } from "../dao/daoManager.js"

// PRODUCTS
const dataProducts = await getManagerProducts()
const managerProducts = new dataProducts.ManagerProductsDao

// CARTS
const dataCarts = await getManagerCarts()
const managerCarts = new dataCarts.ManagerCartsDao

// CARTS
const dataMessages = await getManagerMessages()
const managerMessages = new dataMessages.ManagerMessagesDao

// USERS
const dataUsers = await getManagerUsers()
const managerUsers = new dataUsers.ManagerUsersDao

export { managerProducts, managerCarts, managerMessages, managerUsers }