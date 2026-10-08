import { useCallback, useEffect, useState } from 'react';

/**
 * Tracks whether the page has scrolled past a threshold, used for the
 * sticky-header state transition.
 */
export function useScrollHeader(threshold = 120) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);

  return scrolled;
}

/** Reading progress as a 0–1 ratio for the current document. */
export function useReadingProgress(enabled = true) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    const update = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [enabled]);

  return progress;
}

/** Persisted list of saved article ids. */
export function useBookmarks() {
  const KEY = 'daily-edition:saved';
  const [saved, setSaved] = useState(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {
      /* storage unavailable — bookmarks stay session-only */
    }
  }, [saved]);

  const toggle = useCallback((id) => {
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }, []);

  const isSaved = useCallback((id) => saved.includes(id), [saved]);

  return { saved, toggle, isSaved };
}

/** Locks body scroll while an overlay is open. */
export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}
