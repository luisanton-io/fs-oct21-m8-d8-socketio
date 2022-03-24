import { app } from "../app";
import supertest from "supertest";
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const client = supertest(app)

describe("Testing the chat endpoints", () => {

    beforeAll(done => {
        // console.log(process.env.MONGO_URL_TEST)
        mongoose.connect(process.env.MONGO_URL_TEST!)
            .then(() => {
                console.log("Connected to Mongo DB in test...")
                done()
            })
    })

    afterAll(done => {
        mongoose.connection.dropDatabase().then(() => {
            return mongoose.connection.close()
        }).then(() => {
            console.log("Dropped database and closed connection")
            done()
        })
    })

    it("should work", () => {
        expect(true).toBe(true);
    })

    it("should create a new room using POST /rooms", async () => {
        const response = await client.post('/rooms').send({
            name: 'blue'
        })

        expect(response.status).toBe(201)
        expect(response.body.name).toBe('blue')
        expect(response.body._id).toBeDefined()

    })

    it("should return the chat history for the blue room when requesting the blue room information", async () => {
        const response = await client.get('/rooms/blue')
        expect(response.status).toBe(200)
        expect(response.body.messages.length).toBe(0)
    })
})

