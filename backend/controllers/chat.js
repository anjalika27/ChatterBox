import ChatDB from '../models/chat.js'
import MessageDB from '../models/message.js'

export async function addChatRoom(req, res) {
    const { sender_id, receiver_id, group_chat, group_name } = req.body;

    try {
        if (!sender_id || !receiver_id) return res.status(400).send('missing id of sender/receiver');

        let chatRoom = await ChatDB.aggregate([
            {
                $match: {
                    participants: { $all: [sender_id, ...receiver_id] },
                    group_chat: group_chat
                }
            },
            {
                $lookup: {
                    from: "users",             // The collection to join
                    localField: "participants", // Field in 'Chat' (emails)
                    foreignField: "email",     // Matching field in 'User'
                    as: "userDetails"          // Output field
                }
            }
        ]);

        if (chatRoom.length == 0) {
            chatRoom = await ChatDB.create({
                group_name: group_name,
                group_chat: group_chat,
                participants: [sender_id, ...receiver_id],
                admins: [sender_id],
                created_by: sender_id
            })

            const chatWithUserDetails = await ChatDB.aggregate([
                {
                    $match: {
                        _id: chatRoom._id // Match the newly created chat room
                    }
                },
                {
                    $lookup: {
                        from: "users",             // Collection to join
                        localField: "participants", // Field in 'Chat' (emails)
                        foreignField: "email",     // Matching field in 'User'
                        as: "userDetails"          // Output field
                    }
                }
            ]);

            chatRoom = chatWithUserDetails;
        }
        chatRoom = chatRoom[0];
        // console.log(chatRoom, 'newchatroom added');

        return res.status(201).json(chatRoom)

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
            // 🔹 Match chat rooms where user is a participant OR creator
            {
                $match: {
                    $or: [
                        { created_by: email }, // If the user created the chat room
                        { participants: email } // If the user is a participant
                    ]
                }
            },
            // 🔹 Lookup user details for participants
            {
                $lookup: {
                    from: "users",
                    localField: "participants",
                    foreignField: "email",
                    as: "userDetails"
                }
            },
        ]);

        //not able to get name of participants
        return res.status(200).json(data)
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error', error);
    }
}

export async function getAllMessages(req, res) {
    try {
        const { chat_room_id } = req.query
        if (!chat_room_id) return res.status(400).send('missing chat room id')

        const allMessages = await MessageDB.aggregate([
            {
                $match: {
                    chat_room_id// Match the newly created chat room
                }
            },
            {
                $lookup: {
                    from: "users",             // Collection to join
                    localField: "receiver_id", // Field in 'Chat' (emails)
                    foreignField: "email",     // Matching field in 'User'
                    as: "receiverDetails"          // Output field
                },

            },
            {
                $lookup: {
                    from: "users",
                    localField: "sender_id",
                    foreignField: "email",
                    as: "senderDetails"
                }
            }
        ])
        // console.log(allMessages);

        return res.status(200).send(allMessages)
    } catch (error) {
        console.log(error);
        return res.status(500).send('server error', error);
    }
}

export async function addMessage(req, res) {

    try {
        const { sender_id, receiver_id, message, chat_room_id } = req.body;
        if (!sender_id || !receiver_id || !chat_room_id) return res.status(400).send('missing id of sender/receiver/chatroom');

        const newMessage = await MessageDB.create({
            sender_id, receiver_id, chat_room_id: chat_room_id, status: 'sent',
            message
        })

        return res.status(201).send(newMessage)

    } catch (error) {
        console.log(error);
        return res.status(500).send('server error', error);
    }
}


export async function updateGroup(req, res) {
    const { users } = req.body;
    const { chat_room_id } = req.params;

    if (!chat_room_id)
        return res.status(400).send('missing id of sender/receiver/chatroom');

    try {
        const updatedChat = await ChatDB.findByIdAndUpdate(
            chat_room_id,
            { $set: { participants: users } }, // Update participants field with new users
            { new: true } // Return the updated document
        );

        if (!updatedChat) {
            return res.status(404).send("Chat room not found.");
        }

        return res.status(200).json(updatedChat);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error" });
    }
}