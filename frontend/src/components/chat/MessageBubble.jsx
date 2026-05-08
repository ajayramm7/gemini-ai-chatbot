import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiCopy } from 'react-icons/fi';
import { formatTime } from '../../utils/formatters';

const MarkdownRenderer = lazy(() => import('./MarkdownRenderer.jsx'));

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser ? (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-extrabold text-ink">
          G
        </div>
      ) : null}

      <div className={`max-w-[86%] md:max-w-[74%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div
          className={`rounded-[24px] border px-5 py-4 leading-7 shadow-lift ${
            isUser
              ? 'border-cyan-200/30 bg-cyan-200 text-ink'
              : 'markdown-body border-white/10 bg-white/8 text-white'
          }`}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap text-sm md:text-[15px]">{message.content}</p>
          ) : (
            <Suspense fallback={<p className="whitespace-pre-wrap text-sm md:text-[15px]">{message.content}</p>}>
              <MarkdownRenderer>{message.content}</MarkdownRenderer>
            </Suspense>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2 text-xs text-white/38">
          <span>{formatTime(message.timestamp)}</span>
          {!isUser ? (
            <button
              onClick={copy}
              className="inline-flex items-center gap-1 rounded-full px-2 py-1 opacity-0 transition hover:bg-white/10 group-hover:opacity-100 focus:opacity-100"
              title="Copy response"
            >
              {copied ? <FiCheck /> : <FiCopy />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          ) : null}
        </div>
      </div>

      {isUser ? (
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-sm font-extrabold text-ink">
          U
        </div>
      ) : null}
    </motion.article>
  );
}
