import UserDB from '../models/user.js'

export async function signin(req, res) {
    const { user } = req.body;

    if (!user) return res.status(400).send('Missing Params');
    try {
        const existingUser = await UserDB.findOne({
            email: user.email
        });

        if (!existingUser) {
            await UserDB.create({
                first_name: user.given_name,
                last_name: user.family_name,
                email: user.email,
                profile_photo: user.picture || ""
            })
        }
        return res.status(200).send('User Added')

    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error', error)

    }
}