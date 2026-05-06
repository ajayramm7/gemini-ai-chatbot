import crypto from 'crypto';

const chats = new Map();

const createEmptyChat = (title = 'New Gemini Chat') => ({
  id: crypto.randomUUID(),
  title,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  messages: [],
  document: null,
  image: null
});

export const serializeChat = (chat) => ({
  ...chat,
  document: chat.document
    ? {
        id: chat.document.id,
        fileName: chat.document.fileName,
        mimeType: chat.document.mimeType,
        size: chat.document.size,
        uploadedAt: chat.document.uploadedAt,
        characterCount: chat.document.text.length,
        preview: chat.document.text.slice(0, 700)
      }
    : null,
  image: chat.image
    ? {
        id: chat.image.id,
        fileName: chat.image.fileName,
        mimeType: chat.image.mimeType,
        size: chat.image.size,
        uploadedAt: chat.image.uploadedAt,
        preview: `data:${chat.image.mimeType};base64,${chat.image.base64}`
      }
    : null
});

export const memoryStore = {
  createChat() {
    const chat = createEmptyChat();
    chats.set(chat.id, chat);
    return chat;
  },

  getOrCreateChat(chatId) {
    if (chatId && chats.has(chatId)) {
      return chats.get(chatId);
    }
    return this.createChat();
  },

  getChat(chatId) {
    return chats.get(chatId) || null;
  },

  listChats() {
    return Array.from(chats.values())
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .map((chat) => ({
        id: chat.id,
        title: chat.title,
        createdAt: chat.createdAt,
        updatedAt: chat.updatedAt,
        messageCount: chat.messages.length,
        hasDocument: Boolean(chat.document),
        hasImage: Boolean(chat.image)
      }));
  },

  resetChat() {
    return this.createChat();
  },

  addMessage(chatId, message) {
    const chat = this.getOrCreateChat(chatId);
    chat.messages.push({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      ...message
    });

    if (message.role === 'user' && chat.messages.filter((item) => item.role === 'user').length === 1) {
      chat.title = message.content.slice(0, 44) || 'Gemini Chat';
    }

    chat.updatedAt = new Date().toISOString();
    return chat;
  },

  setDocument(chatId, document) {
    const chat = this.getOrCreateChat(chatId);
    chat.document = document;
    chat.updatedAt = new Date().toISOString();
    return chat;
  },

  setImage(chatId, image) {
    const chat = this.getOrCreateChat(chatId);
    chat.image = image;
    chat.updatedAt = new Date().toISOString();
    return chat;
  }
};
