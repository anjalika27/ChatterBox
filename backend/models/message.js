import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender_id: { type: String, ref: 'users', required: true },
    receiver_id: { type: String, ref: 'users', required: true },
    message: String,
    status: String
}, { timestamps: true })    

const messageModel = mongoose.model('messages', messageSchema)

export default messageModel