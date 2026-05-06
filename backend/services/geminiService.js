import { GoogleGenAI } from '@google/genai';
import { ApiError } from '../utils/apiError.js';
import { buildConversationContext } from './contextService.js';
import { toGeminiImagePart } from '../utils/fileUtils.js';

const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

let client = null;

const getClient = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new ApiError(500, 'GEMINI_API_KEY is not configured on the backend.');
  }

  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  return client;
};

export const generateChatResponse = async ({ chat, prompt }) => {
  const ai = getClient();
  const promptWithContext = buildConversationContext(chat, prompt);
  const imagePart = toGeminiImagePart(chat.image);
  const contents = imagePart
    ? [{ role: 'user', parts: [{ text: promptWithContext }, imagePart] }]
    : promptWithContext;

  const result = await ai.models.generateContent({
    model: modelName,
    contents,
    config: {
      temperature: 0.65,
      topP: 0.9,
      maxOutputTokens: 1800
    }
  });

  return result.text || 'I could not generate a response this time.';
};
