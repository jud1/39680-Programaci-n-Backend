import usersModel from "../models/usersModel.js";

// Get all
const findUsers = async () => {
    try {
        const users = await usersModel.find()
        return users
    } catch (error) {
        return error
    }

}

// Get one
const findUserById = async (id) => {
    try {
        const user = await usersModel.findById(id)
        return user
    } catch (error) {
        return error
    }

}

// Find by email
const findUserByEmail = async (email) => {
    try {
        const user = await usersModel.findOne({ email: email })
        return user
    } catch (error) {
        return error
    }

}

// Create one
const createUser = async (user) => {
    try {
        const newUser = new usersModel(user)
        await newUser.save()
        return newUser
    } catch (error) {
        return error
    }

}

export { findUsers, findUserById, findUserByEmail, createUser }