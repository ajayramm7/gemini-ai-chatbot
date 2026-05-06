import { motion } from 'framer-motion';
import { FiFileText, FiImage, FiMessageCircle } from 'react-icons/fi';

const items = [
  { icon: FiMessageCircle, text: 'Ask questions with full conversation memory.' },
  { icon: FiFileText, text: 'Attach PDF or TXT files for document-aware answers.' },
  { icon: FiImage, text: 'Upload an image and discuss visual details.' }
];

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto flex max-w-3xl flex-col items-center px-6 py-16 text-center"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-ink shadow-lift">
        <FiMessageCircle className="h-7 w-7" />
      </div>
      <h2 className="text-3xl font-extrabold tracking-normal md:text-5xl">Start a sharper Gemini conversation.</h2>
      <p className="mt-4 max-w-2xl text-base leading-7 text-white/62">
        Bring a prompt, a document, or an image. The chat keeps the current context in memory until you begin a new one.
      </p>
      <div className="mt-8 grid w-full gap-3 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.text} className="rounded-2xl border border-white/10 bg-white/6 p-4 text-left">
            <item.icon className="mb-3 h-5 w-5 text-cyan-200" />
            <p className="text-sm text-white/70">{item.text}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
