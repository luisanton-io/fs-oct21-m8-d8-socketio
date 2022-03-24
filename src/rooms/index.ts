import express from "express";
import Room from "./model";

const roomsRouter = express.Router();

roomsRouter
    .post('/', async (req, res) => {
        try {
            const room = new Room({
                name: req.body.name
            })
            await room.save()
            res.status(201).send(room)
        } catch (e) {
            res.status(400).send(e)
        }
    })
    .get('/:roomName', async (req, res, next) => {
        try {
            const room = await Room.findOne({ name: req.params.roomName })

            if (!room) {
                return res.status(404).send("Room not found")
            }

            res.status(200).send(room)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    })

export default roomsRouter