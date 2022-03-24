import { httpServer } from "./io";
import mongoose from "mongoose";

process.env.TS_NODE_DEV && require("dotenv").config()

if (!process.env.MONGO_URL) {
    throw new Error("No Mongo URL defined.")
}

mongoose.connect(process.env.MONGO_URL).then(() => {
    // CAUTION: we do not app.listen() 
    // but rather httpServer.listen()
    httpServer.listen(3030, () => {
        console.log("Server is listening on port 3030");
    });
})

