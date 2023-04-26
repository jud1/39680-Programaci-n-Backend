import { findUsers, findUserById, findUserByEmail } from "../services/usersServices.js";

const getUsers = async (req, res) => {
    try {
        const users = await findUsers()
        res.status(200).send(users)

    } catch (error) {
        res.status(500).send(error)
    }
}

const getUserById = async (req, res) => {
    try {
        const users = await findUserById(req.params.id)
        res.status(200).send(users)

    } catch (error) {
        res.status(500).send(error)
    }
}

export { getUsers, getUserById }