import mongoose from "mongoose"

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    // id: { // the socket id from which it was sent
    //     type: String,
    //     required: true
    // },
    timestamp: {
        type: Number,
        required: true
    }
})

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    messages: {
        type: [MessageSchema],
        required: true,
        default: []
    }
})

const Room = mongoose.model('rooms', RoomSchema)

export default Room