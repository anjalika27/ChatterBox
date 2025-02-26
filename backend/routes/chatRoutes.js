import express from 'express'
import { addChatRoom, getAllChatRooms, addMessage, getAllMessages, updateGroup } from '../controllers/chat.js';

const router = express.Router()

router.post('/addChatRoom', addChatRoom)
    .get('/getAllChatRooms', getAllChatRooms)
    .get('/getAllMessages', getAllMessages)
    .post('/addMessage', addMessage)
    .post('/updateGroup/:chat_room_id', updateGroup);

export default router;