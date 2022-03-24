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

// The interface Room is important because you need to define
// the type of the document that will be extracted by the model.

// NOT for the Model type checking (that happens directly using the Schema)
// BUT for the Typescript compiler.

interface Room {
    name: string
    messages: {
        text: string,
        sender: string,
        timestamp: number
    }[]
}

const RoomSchema = new mongoose.Schema<Room>({
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