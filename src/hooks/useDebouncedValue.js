import { useEffect, useState } from 'react';

// Returns a debounced copy of `value` that only updates after `delay` ms
// of inactivity. Handy for anything that should react to typing without
// firing on every keystroke (e.g. future search boxes, extra autosave hooks).
export const useDebouncedValue = (value, delay = 500) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
};
