import { useState } from 'react';
import { Link } from 'react-router-dom';
import { breakingArticles } from '../lib/articles.js';
import { timeAgo } from '../lib/format.js';
import { getCategoryName } from '../data/categories.js';

/**
 * Breaking-news strip. Content comes from articles flagged `breaking`.
 * The marquee is decorative motion: it pauses on hover/focus, can be paused
 * by the reader, and is disabled entirely under reduced-motion preferences.
 */
export default function BreakingStrip() {
  const [paused, setPaused] = useState(false);
  const items = breakingArticles();

  if (!items.length) return null;

  const renderItem = (article, index) => (
    <Link
      key={`${article.id}-${index}`}
      to={`/article/${article.slug}`}
      className="group inline-flex items-center gap-2 whitespace-nowrap px-5 font-sans text-[12px] text-white/90 transition-colors hover:text-white"
    >
      <span className="font-semibold uppercase tracking-[0.1em] text-white/60">
        {getCategoryName(article.category)}
      </span>
      <span className="font-medium">{article.headline}</span>
      <time dateTime={article.publishedAt} className="text-white/50">
        {timeAgo(article.publishedAt)}
      </time>
    </Link>
  );

  return (
    <div className="relative flex items-stretch border-y border-accent-dark/40 bg-accent text-white">
      <p className="z-10 flex shrink-0 items-center gap-2 bg-accent-dark px-4 py-2 font-sans text-[10px] font-semibold uppercase tracking-[0.16em]">
        <span aria-hidden="true" className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Breaking
      </p>

      <div className="group relative min-w-0 flex-1 overflow-hidden" aria-live="polite">
        <div
          className={`flex w-max items-center py-2 ${paused ? 'paused' : 'animate-marquee'} motion-reduce:animate-none`}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="flex items-center">{items.map(renderItem)}</div>
          <div className="flex items-center" aria-hidden="true">
            {items.map((article, index) => renderItem(article, `dup-${index}`))}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? 'Resume breaking news ticker' : 'Pause breaking news ticker'}
        className="z-10 hidden shrink-0 items-center border-l border-white/25 px-3 text-white/80 transition-colors hover:bg-accent-dark hover:text-white sm:flex"
      >
        {paused ? (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true" fill="currentColor">
            <path d="M0 0l10 6-10 6z" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" aria-hidden="true" fill="currentColor">
            <rect width="3" height="12" />
            <rect x="7" width="3" height="12" />
          </svg>
        )}
      </button>
    </div>
  );
}
