import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    message: String,
}, { timestamps: true })

const chatModel = mongoose.model('chats', userSchema)

export default chatModel