import express from 'express'
import { addChatRoom, getAllChatRooms, addMessage } from '../controllers/chat.js';

const router = express.Router()

router.post('/addChatRoom', addChatRoom)
    .get('/getAllChatRooms', getAllChatRooms)
    .post('/addMessage', addMessage)

export default router;