import express from 'express'
import { addChatRoom } from '../controllers/chat.js';

const router = express.Router()

router.post('/addChatRoom', addChatRoom);

export default router;