import { useEffect } from 'react';

export const useKeyboardShortcuts = ({ onNewChat, onFocusInput }) => {
  useEffect(() => {
    const handler = (event) => {
      const mod = event.ctrlKey || event.metaKey;
      if (mod && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        onFocusInput?.();
      }
      if (mod && event.shiftKey && event.key.toLowerCase() === 'n') {
        event.preventDefault();
        onNewChat?.();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onFocusInput, onNewChat]);
};
