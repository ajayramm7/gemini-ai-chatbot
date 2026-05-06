import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { memoryStore, serializeChat } from '../services/memoryStore.js';
import { createImagePayload, extractDocumentText } from '../utils/fileUtils.js';

export const uploadDocument = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  const text = await extractDocumentText(req.file);

  if (!text) {
    throw new ApiError(400, 'The uploaded document did not contain readable text.');
  }

  const document = {
    id: crypto.randomUUID(),
    fileName: req.file.originalname,
    mimeType: req.file.mimetype,
    size: req.file.size,
    text,
    uploadedAt: new Date().toISOString()
  };

  const chat = memoryStore.setDocument(chatId, document);

  res.status(201).json({
    chatId: chat.id,
    document: {
      id: document.id,
      fileName: document.fileName,
      mimeType: document.mimeType,
      size: document.size,
      uploadedAt: document.uploadedAt,
      characterCount: document.text.length
    },
    chat: serializeChat(chat),
    chats: memoryStore.listChats()
  });
});

export const uploadImage = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  const image = {
    id: crypto.randomUUID(),
    ...createImagePayload(req.file),
    uploadedAt: new Date().toISOString()
  };

  const chat = memoryStore.setImage(chatId, image);

  res.status(201).json({
    chatId: chat.id,
    image: {
      id: image.id,
      fileName: image.fileName,
      mimeType: image.mimeType,
      size: image.size,
      uploadedAt: image.uploadedAt,
      preview: `data:${image.mimeType};base64,${image.base64}`
    },
    chat: serializeChat(chat),
    chats: memoryStore.listChats()
  });
});
