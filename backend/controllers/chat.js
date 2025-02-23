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