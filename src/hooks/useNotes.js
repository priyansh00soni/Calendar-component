import { useState, useEffect, useRef } from 'react';

export function useNotes(storageKey) {
  const [notes, setNotes] = useState('');
  const [saveState, setSaveState] = useState('saved')
  const timerRef = useRef(null);
  const isInitialLoad = useRef(true);

  //get notes
  useEffect(() => {
    isInitialLoad.current = true;
    const saved = localStorage.getItem(`notes-${storageKey}`);
    setNotes(saved || '');
    setSaveState('saved');
  }, [storageKey]);

  // save notes
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    setSaveState('saving');
    clearTimeout(timerRef.current);

    // Wait 500ms after the last keystroke to actually save
    timerRef.current = setTimeout(() => {
      if (notes !== undefined) {
        localStorage.setItem(`notes-${storageKey}`, notes);
        setSaveState('saved');
      }
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [notes, storageKey]);

  return { notes, setNotes, saveState };
}
