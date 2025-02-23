import ChatDB from '../models/chat.js'

export async function addChatRoom(req, res) {
    const { sender_id, receiver_id } = req.body;

    try {
        if (!sender_id || !receiver_id) return res.status(400).send('missing id of sender/receiver');

        const existingChatRoom = await ChatDB.findOne({
            participants: { $all: [sender_id, receiver_id] },
            group_chat: false
        })

        let newChatRoom = null;
        if (!existingChatRoom) {
            newChatRoom = await ChatDB.create({
                chat_name: null,
                group_chat: false,
                participants: [sender_id, receiver_id],
                admins: [],
                created_by: sender_id
            })
        }
        return res.status(201).json(newChatRoom)

    } catch (error) {
        console.log(error);
        return res.status(500).send('server error', error);
    }
}


export async function getAllChatRooms(req, res) {
    const { email } = req.query;
    try {
        if (!email) return res.status(400).send('missing params')
        const data = await ChatDB.aggregate([
            {
                $lookup: {
                    from: 'users',
                    localField: 'participants',
                    foreignField: 'email',
                    as: 'userDetails'
                }
            }])

        //not able to get name of participants
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error', error);
    }
}