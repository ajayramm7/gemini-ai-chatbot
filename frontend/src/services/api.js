import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 60000
});

export const chatApi = {
  createChat: () => api.post('/chat'),
  listChats: () => api.get('/chat'),
  getChat: (chatId) => api.get(`/chat/${chatId}`),
  newChat: () => api.post('/chat/new'),
  sendMessage: (payload) => api.post('/chat/message', payload),
  uploadDocument: (formData, onUploadProgress) =>
    api.post('/upload/document', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    }),
  uploadImage: (formData, onUploadProgress) =>
    api.post('/upload/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress
    })
};

export const getApiErrorMessage = (error) =>
  error?.response?.data?.message || error?.message || 'Something went wrong.';
