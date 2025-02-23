import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    chat_name: String,
    participants: [
        { type: mongoose.Schema.Types.ObjectId, ref: "users" } // References User model
    ]
}, { timestamps: true })

const chatModel = mongoose.model('chats', chatSchema)

export default chatModel


