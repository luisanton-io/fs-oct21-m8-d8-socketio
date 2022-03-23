import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

// We can initialize a in-memory shared array that will be used in our socket handlers
// as well as in our express routes.

let onlineUsers = []

// Initializing our express app
const app = express();

app.use(cors());
app.use(express.json());

app.get('/online-users', (req, res) => {
    res.send({ onlineUsers })
})

// Handling some express routes/routers...
//....

// Creating a new HTTP server using the standard NodeJS http module 
// passing our express app for the configuration of the routes*
const httpServer = createServer(app);

// * This is important because the Server from socket.io accepts in input only a standard HTTP server
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    // ...
    console.log(socket.id)

    socket.emit("welcome", { message: "Welcome!" })

    socket.on("setUsername", ({ username, room }) => {
        console.log(username)

        onlineUsers.push({ username, id: socket.id, room })

        // Now we have the socket join a specific "room"
        socket.join(room)

        console.log(socket.rooms)

        // Emits to the other end of the channel
        socket.emit("loggedin")

        // Emits to the other end of *every other* channel
        socket.broadcast.emit("newConnection")

        // Emits to every connected socket
        // io.sockets.emit() 
    })

    socket.on("sendmessage", ({ message, room }) => {
        console.log(message)

        // Emits only to people inside of the defined "room"
        socket.to(room).emit("message", message)
    })

    socket.on("disconnect", () => {
        onlineUsers = onlineUsers.filter(user => user.id !== socket.id)
        socket.broadcast.emit("disconnectedUser")
    })

});

// CAUTION: we do not app.listen() 
// but rather httpServer.listen()
httpServer.listen(3030, () => {
    console.log("Server is listening on port 3030");
});