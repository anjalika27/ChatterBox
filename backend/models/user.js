import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    first_name: String,
    last_name: String,
    profile_photo: String,
    email: { type: String, required: true, unique: true },

}, { timestamps: true })

export const userModel = mongoose.model('users', userSchema)


