import { Router } from 'express';
import { createChat, getChat, listChats, resetChat, sendMessage } from '../controllers/chatController.js';

const router = Router();

router.get('/', listChats);
router.post('/', createChat);
router.post('/message', sendMessage);
router.post('/new', resetChat);
router.get('/:chatId', getChat);

export default router;
