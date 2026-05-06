import { motion } from 'framer-motion';
import { FiFileText, FiImage, FiMessageSquare, FiPlus, FiZap } from 'react-icons/fi';
import Button from '../ui/Button';
import { truncate } from '../../utils/formatters';

export default function Sidebar({ chats, activeChatId, onNewChat, onSelectChat }) {
  return (
    <aside className="glass flex h-full w-full flex-col rounded-none p-4 lg:w-80 lg:rounded-[28px]">
      <div className="mb-5 flex items-center gap-3 px-2">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-300 text-ink shadow-lift">
          <FiZap className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-extrabold tracking-normal">Gemini Studio</h1>
          <p className="text-xs text-white/56">Multimodal AI workspace</p>
        </div>
      </div>

      <Button icon={FiPlus} onClick={onNewChat} className="mb-5 w-full">
        New Chat
      </Button>

      <div className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/42">
        Chats
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {chats.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/55">
            Your conversations will appear here.
          </div>
        ) : chats.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 3 }}
            onClick={() => onSelectChat(item.id)}
            className={`w-full rounded-2xl border p-3 text-left transition ${
              item.id === activeChatId
                ? 'border-cyan-300/55 bg-cyan-300/12'
                : 'border-white/10 bg-white/5 hover:bg-white/9'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <FiMessageSquare className="h-4 w-4 text-cyan-200" />
              <span>{truncate(item.title || 'Gemini Chat', 30)}</span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-white/45">
              <span>{item.messageCount} messages</span>
              {item.hasDocument ? <FiFileText className="h-3.5 w-3.5" /> : null}
              {item.hasImage ? <FiImage className="h-3.5 w-3.5" /> : null}
            </div>
          </motion.button>
        ))}
      </div>
    </aside>
  );
}
