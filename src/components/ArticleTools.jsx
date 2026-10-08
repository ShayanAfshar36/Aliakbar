import { useCallback, useState } from 'react';
import { getCategoryName } from '../data/categories.js';

function ToolButton({ label, onClick, active, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={typeof active === 'boolean' ? active : undefined}
      className={`inline-flex items-center gap-2 border px-3 py-2 font-sans text-[12px] font-medium transition-colors ${
        active
          ? 'border-ink bg-ink text-white'
          : 'border-rule-strong text-ink-soft hover:border-ink hover:text-accent'
      }`}
    >
      {children}
      <span>{label}</span>
    </button>
  );
}

/**
 * Reader tools for an article: save, copy link, share and print.
 * Save is persisted locally; share uses the Web Share API when available
 * and falls back to copying the canonical link.
 */
export default function ArticleTools({ article, isSaved, onToggleSave }) {
  const [note, setNote] = useState('');

  const url = typeof window !== 'undefined' ? `${window.location.origin}/article/${article.slug}` : '';

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setNote('Link copied to clipboard.');
    } catch {
      setNote('Copy failed — select the address bar to copy the link.');
    }
    window.setTimeout(() => setNote(''), 4000);
  }, [url]);

  const share = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: article.headline, text: article.standfirst, url });
        return;
      } catch {
        /* reader dismissed the share sheet */
      }
    }
    copy();
  }, [article, url, copy]);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <ToolButton
        label={isSaved ? 'Saved' : 'Save'}
        active={isSaved}
        onClick={() => onToggleSave(article.id)}
      >
        <svg width="14" height="15" viewBox="0 0 17 18" aria-hidden="true" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.5">
          <path d="M3.5 1.5h10a1 1 0 0 1 1 1v14l-6-3.6-6 3.6v-14a1 1 0 0 1 1-1Z" />
        </svg>
      </ToolButton>

      <ToolButton label="Copy link" onClick={copy}>
        <svg width="15" height="15" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M7.5 10.5a3 3 0 0 0 4.2 0l2.6-2.6a3 3 0 0 0-4.2-4.2l-1 1" strokeLinecap="round" />
          <path d="M10.5 7.5a3 3 0 0 0-4.2 0l-2.6 2.6a3 3 0 0 0 4.2 4.2l1-1" strokeLinecap="round" />
        </svg>
      </ToolButton>

      <ToolButton label="Share" onClick={share}>
        <svg width="15" height="15" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="14" cy="3.6" r="2.1" />
          <circle cx="4" cy="9" r="2.1" />
          <circle cx="14" cy="14.4" r="2.1" />
          <path d="M5.9 8 12 4.6M5.9 10 12 13.4" strokeLinecap="round" />
        </svg>
      </ToolButton>

      <ToolButton label="Print" onClick={() => window.print()}>
        <svg width="15" height="15" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4.5 6.5V2h9v4.5M4.5 13H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1.5" />
          <rect x="4.5" y="11" width="9" height="5" />
        </svg>
      </ToolButton>

      <a
        href={`/section/${article.category}`}
        className="inline-flex items-center gap-2 border border-rule-strong px-3 py-2 font-sans text-[12px] font-medium text-ink-soft transition-colors hover:border-ink hover:text-accent"
      >
        More in {getCategoryName(article.category)}
      </a>

      <p role="status" className="w-full font-sans text-[12px] text-muted">{note}</p>
    </div>
  );
}
