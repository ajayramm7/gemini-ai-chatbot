import { AnimatePresence } from 'framer-motion';
import AttachmentRail from './AttachmentRail';
import Composer from './Composer';
import EmptyState from './EmptyState';
import LoadingSkeleton from './LoadingSkeleton';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import { useAutoScroll } from '../../hooks/useAutoScroll';

export default function ChatWindow({
  chat,
  isBooting,
  isSending,
  uploadProgress,
  onSend,
  onUpload,
  inputRef
}) {
  const messages = chat?.messages || [];
  const bottomRef = useAutoScroll(`${messages.length}-${isSending}`);

  return (
    <section className="glass flex min-h-0 flex-1 flex-col overflow-hidden rounded-none lg:rounded-[28px]">
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="text-base font-bold md:text-lg">{chat?.title || 'Gemini Chat'}</h2>
          <p className="text-xs text-white/45">
            {chat?.document ? 'Document context active' : 'Text context active'}
            {chat?.image ? ' + image context' : ''}
          </p>
        </div>
        <div className="rounded-full border border-mint/30 bg-mint/12 px-3 py-1 text-xs font-semibold text-mint">
          Live
        </div>
      </header>

      <AttachmentRail document={chat?.document} image={chat?.image} uploadProgress={uploadProgress} />

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6">
        {isBooting ? <LoadingSkeleton /> : null}
        {!isBooting && messages.length === 0 ? <EmptyState /> : null}
        <div className="mx-auto flex max-w-5xl flex-col gap-5">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </AnimatePresence>
          {isSending ? <TypingIndicator /> : null}
          <div ref={bottomRef} />
        </div>
      </div>

      <Composer ref={inputRef} onSend={onSend} onUpload={onUpload} disabled={isSending || isBooting} />
    </section>
  );
}
