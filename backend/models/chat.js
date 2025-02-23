import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    sender_id: { type: String, ref: 'users', required: true },
    receiver_id: { type: String, ref: 'users', required: true },
    message: String
}, { timestamps: true })

export const chatModel = mongoose.model('chats', userSchema)