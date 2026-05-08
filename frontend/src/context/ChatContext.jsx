import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { chatApi, getApiErrorMessage } from '../services/api';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  }, []);

  const refreshChats = useCallback(async () => {
    const { data } = await chatApi.listChats();
    setChats(data.chats || []);
  }, []);

  const startNewChat = useCallback(async () => {
    const { data } = await chatApi.newChat();
    setChat(data.chat);
    await refreshChats();
    showToast('Fresh chat started');
  }, [refreshChats, showToast]);

  const loadChat = useCallback(async (chatId) => {
    const { data } = await chatApi.getChat(chatId);
    setChat(data.chat);
  }, []);

  useEffect(() => {
    const boot = async () => {
      try {
        const { data } = await chatApi.createChat();
        setChat(data.chat);
        await refreshChats();
      } catch (error) {
        showToast(getApiErrorMessage(error), 'error');
      } finally {
        setIsBooting(false);
      }
    };

    boot();
  }, [refreshChats, showToast]);

  const sendMessage = useCallback(async (message) => {
    if (!message.trim() || !chat?.id) return;

    const optimisticUserMessage = {
      id: `local-${Date.now()}`,
      role: 'user',
      content: message.trim(),
      timestamp: new Date().toISOString()
    };

    setChat((current) => ({
      ...current,
      messages: [...(current?.messages || []), optimisticUserMessage]
    }));

    setIsSending(true);
    try {
      const { data } = await chatApi.sendMessage({ chatId: chat.id, message });
      setChat(data.chat);
      setChats(data.chats || []);
    } catch (error) {
      showToast(getApiErrorMessage(error), 'error');
    } finally {
      setIsSending(false);
    }
  }, [chat?.id, showToast]);

  const uploadFile = useCallback(async (file, type) => {
    if (!file || !chat?.id) return;

    const isPdf = type === 'document' && file.name.toLowerCase().endsWith('.pdf');
    const localPreviewUrl = isPdf ? URL.createObjectURL(file) : null;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('chatId', chat.id);
    setUploadProgress(4);

    const onUploadProgress = (event) => {
      if (!event.total) return;
      setUploadProgress(Math.round((event.loaded * 100) / event.total));
    };

    try {
      const request = type === 'image'
        ? chatApi.uploadImage(formData, onUploadProgress)
        : chatApi.uploadDocument(formData, onUploadProgress);
      const { data } = await request;
      const nextChat = data.chat;
      if (localPreviewUrl && nextChat.document) {
        nextChat.document = {
          ...nextChat.document,
          localPreviewUrl,
          localPreviewType: 'pdf'
        };
      }
      setChat(nextChat);
      setChats(data.chats || []);
      showToast(type === 'image' ? 'Image added to this chat' : 'Document processed successfully');
    } catch (error) {
      if (localPreviewUrl) {
        URL.revokeObjectURL(localPreviewUrl);
      }
      showToast(getApiErrorMessage(error), 'error');
    } finally {
      setTimeout(() => setUploadProgress(0), 650);
    }
  }, [chat?.id, showToast]);

  const value = useMemo(() => ({
    chat,
    chats,
    isBooting,
    isSending,
    uploadProgress,
    toast,
    setToast,
    sendMessage,
    uploadFile,
    startNewChat,
    loadChat
  }), [chat, chats, isBooting, isSending, loadChat, sendMessage, startNewChat, toast, uploadFile, uploadProgress]);

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};
