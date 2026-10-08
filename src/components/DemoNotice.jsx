import { useState } from 'react';

/**
 * Honest labelling of the dataset. Every story on this site is fictional
 * placeholder content, and the site says so rather than implying otherwise.
 */
export default function DemoNotice() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-ink-soft text-white/80">
      <div className="shell flex items-center justify-center gap-3 py-2 text-center">
        <p className="font-sans text-[11.5px] leading-snug">
          <span className="eyebrow mr-2 text-accent">Demonstration</span>
          Every article, byline and quotation on this site is fictional placeholder content.
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss demonstration notice"
          className="shrink-0 p-1 text-white/50 transition-colors hover:text-white"
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M1 1l8 8M9 1l-8 8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
