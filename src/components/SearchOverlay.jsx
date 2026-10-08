import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/categories.js';
import { searchArticles, trendingTopics } from '../lib/articles.js';
import { CategoryTag } from './ArticleMeta.jsx';
import { formatDateShort } from '../lib/format.js';

/**
 * Site-wide search. Runs against the local editorial dataset; the query
 * surface (`searchArticles`) is the same one a CMS or news API would back.
 */
export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(
    () => (query.trim().length > 1 ? searchArticles(query, { category: category || null, limit: 6 }) : []),
    [query, category]
  );

  useEffect(() => {
    if (open) {
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
    }
    setQuery('');
    setCategory('');
    return undefined;
  }, [open]);

  useEffect(() => {
    const onKey = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const submit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}${category ? `&section=${category}` : ''}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-ink/50 px-4 pt-[10vh]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" aria-label="Close search" className="absolute inset-0 cursor-default" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl animate-fade-up self-start bg-paper shadow-lift">
        <form onSubmit={submit} className="border-b border-rule p-5">
          <div className="flex items-center gap-3">
            <svg width="20" height="20" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" className="shrink-0 text-muted">
              <circle cx="7.6" cy="7.6" r="5.1" />
              <path d="M11.4 11.4 16 16" strokeLinecap="round" />
            </svg>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search headlines, topics and reporters"
              aria-label="Search headlines, topics and reporters"
              className="w-full bg-transparent font-display text-[1.25rem] outline-none placeholder:font-sans placeholder:text-[0.95rem] placeholder:text-muted"
            />
            <button type="submit" className="btn-ink btn-sm shrink-0">Search</button>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span className="eyebrow text-muted">Filter</span>
            <button
              type="button"
              onClick={() => setCategory('')}
              className={`badge ${category === '' ? 'bg-ink text-white' : 'badge-quiet'}`}
            >
              All sections
            </button>
            {categories.slice(0, 6).map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => setCategory(item.slug === category ? '' : item.slug)}
                className={`badge ${category === item.slug ? 'bg-ink text-white' : 'badge-quiet'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </form>

        <div className="max-h-[52vh] overflow-y-auto p-5">
          {query.trim().length <= 1 ? (
            <div>
              <p className="eyebrow mb-3 text-muted">Trending topics</p>
              <div className="flex flex-wrap gap-2">
                {trendingTopics().map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setQuery(topic)}
                    className="badge-quiet transition-colors hover:border-ink hover:text-accent"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="font-serif text-[0.98rem] text-muted">
              No articles match “{query}”. Try a broader term or remove the section filter.
            </p>
          ) : (
            <ul className="grid gap-4">
              {results.map((article) => (
                <li key={article.id}>
                  <button
                    type="button"
                    onClick={() => {
                      navigate(`/article/${article.slug}`);
                      onClose();
                    }}
                    className="group block w-full text-left"
                  >
                    <div className="flex items-center gap-2">
                      <CategoryTag slug={article.category} as="span" />
                      <span className="meta">{formatDateShort(article.publishedAt)}</span>
                    </div>
                    <p className="headline-link mt-1 font-display text-[1.05rem] font-700 leading-snug">
                      {article.headline}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
