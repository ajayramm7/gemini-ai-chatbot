import { useEffect, useRef } from 'react';

export const useAutoScroll = (dependency) => {
  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [dependency]);

  return ref;
};
