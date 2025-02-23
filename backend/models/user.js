import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    profile_photo: String,
    email: { type: String, required: true, unique: true },

}, { timestamps: true })

const userModel = mongoose.model('users', userSchema)

export default userModel

