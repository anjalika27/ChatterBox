import express from "express"
import http from "http"
import { Server } from "socket.io"
import { connectDB } from "./services/db.js"
import { configDotenv } from "dotenv"
configDotenv()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on('connect', async (socket) => {
    console.log('new user id: ', socket.id);

    socket.on('msge', (msge) => {
        console.log('new msge send: ', msge);

    })

})


const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL

connectDB(DB_URL).then(() => {
    app.listen(PORT, () => {
        console.log('server running');
    })
}).catch((err) => {
    console.log(err, 'error connecting');
})
