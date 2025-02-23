import mongoose from "mongoose";

export const connectDB = async (uri) => {
    await mongoose.connect(uri, {
        dbName: "chatterbox",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}
