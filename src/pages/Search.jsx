import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { searchArticles, trendingTopics } from '../lib/articles.js';
import { categories } from '../data/categories.js';

const SORTS = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
];

export default function Search() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';
  const section = params.get('section') ?? '';
  const sort = params.get('sort') ?? 'relevance';
  const [draft, setDraft] = useState(query);

  const results = useMemo(() => {
    const found = searchArticles(query, { category: section || null });
    if (sort === 'newest') return [...found].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    if (sort === 'oldest') return [...found].sort((a, b) => new Date(a.publishedAt) - new Date(b.publishedAt));
    return found;
  }, [query, section, sort]);

  const update = (next) => {
    const merged = { q: query, section, sort, ...next };
    const cleaned = Object.fromEntries(Object.entries(merged).filter(([, value]) => value));
    setParams(cleaned, { replace: true });
  };

  const submit = (event) => {
    event.preventDefault();
    update({ q: draft.trim() });
  };

  return (
    <>
      <Seo
        title={query ? `Search: ${query}` : 'Search'}
        description="Search every article in THE DAILY EDITION archive by headline, topic, section or reporter."
        noIndex
      />

      <main id="main" className="shell py-10 lg:py-12">
        <header className="border-t-2 border-ink pt-4">
          <p className="eyebrow text-accent">Archive search</p>
          <h1 className="mt-2 font-display text-[2rem] font-800 leading-none tracking-tight sm:text-[2.5rem]">
            Search
          </h1>
        </header>

        <form onSubmit={submit} role="search" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label htmlFor="search-input" className="sr-only">Search articles</label>
          <input
            id="search-input"
            type="search"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Search headlines, topics, sections or reporters"
            className="min-w-0 flex-1 border border-rule-strong bg-paper px-4 py-3 font-sans text-[14px] outline-none transition-colors focus:border-ink"
          />
          <button type="submit" className="btn-accent btn-md shrink-0">Search</button>
        </form>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow text-muted">Section</span>
            <button
              type="button"
              onClick={() => update({ section: '' })}
              className={`badge ${section === '' ? 'bg-ink text-white' : 'badge-quiet'}`}
            >
              All
            </button>
            {categories.map((item) => (
              <button
                key={item.slug}
                type="button"
                onClick={() => update({ section: item.slug })}
                className={`badge ${section === item.slug ? 'bg-ink text-white' : 'badge-quiet'}`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="eyebrow text-muted">Sort</label>
            <select
              id="sort"
              value={sort}
              onChange={(event) => update({ sort: event.target.value })}
              className="border border-rule-strong bg-paper px-3 py-1.5 font-sans text-[12.5px] outline-none focus:border-ink"
            >
              {SORTS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-8 border-t border-rule pt-5 font-sans text-[13px] text-muted" role="status">
          {query
            ? `${results.length} ${results.length === 1 ? 'result' : 'results'} for “${query}”${
                section ? ` in ${categories.find((item) => item.slug === section)?.name}` : ''
              }`
            : 'Enter a term above, or start from a trending topic.'}
        </p>

        {query && results.length > 0 && (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} showStandfirst />
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="mt-8 border border-rule bg-paper-warm p-8">
            <h2 className="font-display text-[1.3rem] font-700">No matching articles</h2>
            <p className="mt-2 max-w-xl font-serif text-muted">
              Nothing in the archive matches that search. Check the spelling, try a broader term, or
              remove the section filter.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {trendingTopics().slice(0, 6).map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => {
                    setDraft(topic);
                    update({ q: topic });
                  }}
                  className="badge-quiet hover:border-ink hover:text-accent"
                >
                  {topic}
                </button>
              ))}
            </div>
            <Link to="/latest" className="mt-6 inline-block btn-ghost btn-md">Browse latest news</Link>
          </div>
        )}
      </main>
    </>
  );
}
