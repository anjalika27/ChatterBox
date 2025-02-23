import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender_id: { type: String, ref: 'users', required: true },
    receiver_id: [{ type: String, ref: 'users', required: true }],
    message: String,
    status: String,
    chat_room_id: { type: String, ref: 'chats', required: true },
}, { timestamps: true })

const messageModel = mongoose.model('messages', messageSchema)

export default messageModel