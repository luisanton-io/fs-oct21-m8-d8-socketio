import cors from "cors";
import express from "express";
import { onlineUsers } from "./io";
import roomsRouter from "./rooms";

// Initializing our express app
const app = express();

app.use(cors());
app.use(express.json());

app.get('/online-users', (req, res) => {
    res.send({ onlineUsers })
})

app.use('/rooms', roomsRouter)

export { app }