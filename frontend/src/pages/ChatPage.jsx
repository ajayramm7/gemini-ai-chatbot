import { useRef } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import Toast from '../components/ui/Toast';
import { useChat } from '../context/ChatContext';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export default function ChatPage() {
  const inputRef = useRef(null);
  const {
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
  } = useChat();

  useKeyboardShortcuts({
    onNewChat: startNewChat,
    onFocusInput: () => inputRef.current?.focus()
  });

  return (
    <main className="h-screen overflow-hidden p-0 lg:p-4">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="grid h-full grid-rows-[auto_1fr] gap-0 lg:grid-cols-[20rem_1fr] lg:grid-rows-1 lg:gap-4"
      >
        <div className="h-[16rem] lg:h-full">
          <Sidebar
            chats={chats}
            activeChatId={chat?.id}
            onNewChat={startNewChat}
            onSelectChat={loadChat}
          />
        </div>
        <ChatWindow
          chat={chat}
          isBooting={isBooting}
          isSending={isSending}
          uploadProgress={uploadProgress}
          onSend={sendMessage}
          onUpload={uploadFile}
          inputRef={inputRef}
        />
      </motion.div>
    </main>
  );
}
