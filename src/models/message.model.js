import mongoose, { Schema } from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    image: {
        type: String
    },
    text: {
        type: String
    },
},
    { timestamps: true }
)

const Message=mongoose.model("message",messageSchema)
export default Message;