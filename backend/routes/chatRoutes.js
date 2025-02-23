import express from 'express'
import { addChatRoom, getAllChatRooms } from '../controllers/chat.js';

const router = express.Router()

router.post('/addChatRoom', addChatRoom)
    .get('/getAllChatRooms', getAllChatRooms)

export default router;