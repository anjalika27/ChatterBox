import express from 'express'
import { addChatRoom, getAllChatRooms, addMessage, getAllMessages } from '../controllers/chat.js';

const router = express.Router()

router.post('/addChatRoom', addChatRoom)
    .get('/getAllChatRooms', getAllChatRooms)
    .get('/getAllMessages', getAllMessages)
    .post('/addMessage', addMessage)

export default router;