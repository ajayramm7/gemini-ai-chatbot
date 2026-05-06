import { AnimatePresence, motion } from 'framer-motion';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export default function Toast({ toast, onClose }) {
  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          onAnimationComplete={() => setTimeout(onClose, 2800)}
          className={`fixed right-4 top-4 z-50 flex max-w-sm items-center gap-3 rounded-2xl border px-4 py-3 text-sm shadow-lift backdrop-blur-2xl ${
            toast.type === 'error'
              ? 'border-coral/40 bg-coral/15 text-red-100'
              : 'border-mint/40 bg-mint/15 text-emerald-50'
          }`}
        >
          {toast.type === 'error' ? <FiAlertCircle /> : <FiCheckCircle />}
          <span>{toast.message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
