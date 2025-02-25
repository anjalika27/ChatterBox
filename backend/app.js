import express from "express"
import http from "http"
import { Server } from "socket.io"
import { connectDB } from "./services/db.js"
import { configDotenv } from "dotenv"
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import cors from 'cors'
configDotenv()

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
    pingTimeout: 120000,
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

io.on('connection', async (socket) => {
    console.log('new user id: ', socket.id);

    socket.on('msge', (msge) => {
        console.log('new msge send: ', msge);

    })
    socket.on('user-join', (userObj) => {
        console.log(userObj.email, 'connected');
        socket.join(userObj.email);
        socket.emit('connected')
    })

    socket.on('new-message', (msgeObj) => {
        console.log(msgeObj.receiver_id, 'ajkbfr');

    // msgeObj.recevier_id.forEach((u) => {
    // console.log(u, 'receiver');

        if (msgeObj.receiver_id && Array.isArray(msgeObj.receiver_id)) {
            msgeObj.receiver_id.forEach((u) => {
                console.log(u, 'receiver');
                socket.in(u).emit('message-received', msgeObj)
            });
        }
        // })

    })
    socket.on('room-join', (room_id) => {
        socket.join(room_id);
        console.log('user joined room ', room_id);
    })
    socket.on('disconnect', () => {
        console.log('socker disconnected');
    })
})

app.use('', [authRoutes, userRoutes, chatRoutes])

const PORT = process.env.PORT || 8000;
const DB_URL = process.env.DB_URL

connectDB(DB_URL).then(() => {
    server.listen(PORT, () => {
        console.log('server running on ', PORT);
    })
}).catch((err) => {
    console.log(err, 'error connecting');
})
