import { motion } from 'framer-motion';

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-3 px-2 py-3 text-sm text-white/58">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300 text-ink text-xs font-bold">G</span>
      <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-white/7 px-4 py-3">
        {[0, 1, 2].map((dot) => (
          <motion.span
            key={dot}
            animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, delay: dot * 0.16 }}
            className="h-2 w-2 rounded-full bg-cyan-200"
          />
        ))}
      </div>
    </div>
  );
}
