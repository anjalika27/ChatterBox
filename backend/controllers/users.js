import UserDB from '../models/user.js'

export async function getAllUsers(req, res) {
    try {
        const users = await UserDB.find();
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error', error)
    }
}