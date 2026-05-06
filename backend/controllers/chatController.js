import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { memoryStore, serializeChat } from '../services/memoryStore.js';
import { generateChatResponse } from '../services/geminiService.js';

export const createChat = asyncHandler(async (_req, res) => {
  const chat = memoryStore.createChat();
  res.status(201).json({ chat: serializeChat(chat) });
});

export const listChats = asyncHandler(async (_req, res) => {
  res.json({ chats: memoryStore.listChats() });
});

export const getChat = asyncHandler(async (req, res) => {
  const chat = memoryStore.getChat(req.params.chatId);

  if (!chat) {
    throw new ApiError(404, 'Chat not found.');
  }

  res.json({ chat: serializeChat(chat) });
});

export const resetChat = asyncHandler(async (_req, res) => {
  const chat = memoryStore.resetChat();
  res.status(201).json({ chat: serializeChat(chat) });
});

export const sendMessage = asyncHandler(async (req, res) => {
  const { chatId, message } = req.body;
  const prompt = String(message || '').trim();

  if (!prompt) {
    throw new ApiError(400, 'Message is required.');
  }

  const chat = memoryStore.addMessage(chatId, {
    role: 'user',
    content: prompt
  });

  const assistantText = await generateChatResponse({ chat, prompt });
  const updatedChat = memoryStore.addMessage(chat.id, {
    role: 'assistant',
    content: assistantText
  });

  res.json({
    chatId: updatedChat.id,
    message: updatedChat.messages.at(-1),
    chat: serializeChat(updatedChat),
    chats: memoryStore.listChats()
  });
});
