import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    group_name: String,
    group_chat: Boolean,
    participants: [
        { type: String, ref: "users" } // References User model
    ],
    admins: [
        { type: String, ref: "users" } // References User model
    ],
    created_by: { type: String, ref: "users" }
}, { timestamps: true })

const chatModel = mongoose.model('chats', chatSchema)

export default chatModel


