const MAX_DOCUMENT_CHARS = 14000;
const MAX_HISTORY_MESSAGES = 12;

const roleLabel = {
  user: 'User',
  assistant: 'Assistant'
};

export const buildConversationContext = (chat, latestPrompt) => {
  const history = chat.messages
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => `${roleLabel[message.role] || message.role}: ${message.content}`)
    .join('\n\n');

  const documentBlock = chat.document?.text
    ? `\n\nUploaded document (${chat.document.fileName}):\n${chat.document.text.slice(0, MAX_DOCUMENT_CHARS)}`
    : '';

  const imageBlock = chat.image
    ? `\n\nAn uploaded image is available in this chat. Use it when the user asks visual questions or when it is relevant.`
    : '';

  return [
    'You are Gemini inside a premium AI chatbot web app.',
    'Be helpful, concise, accurate, and conversational. Use markdown when it improves readability.',
    'When document or image context is available, use it naturally and mention uncertainty when the evidence is incomplete.',
    documentBlock,
    imageBlock,
    history ? `\n\nRecent conversation:\n${history}` : '',
    `\n\nCurrent user message:\n${latestPrompt}`
  ].join('');
};
