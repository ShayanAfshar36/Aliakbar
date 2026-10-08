import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { getById } from '../lib/articles.js';
import { useBookmarks } from '../hooks/index.js';

export default function Saved() {
  const { saved, toggle } = useBookmarks();
  const items = saved.map(getById).filter(Boolean);

  return (
    <>
      <Seo title="Saved articles" description="Articles you have saved in this browser." noIndex />

      <main id="main" className="shell py-10 lg:py-12">
        <header className="border-t-2 border-ink pt-4">
          <p className="eyebrow text-accent">Your reading list</p>
          <h1 className="mt-2 font-display text-[2rem] font-800 leading-none tracking-tight sm:text-[2.5rem]">
            Saved articles
          </h1>
          <p className="mt-3 max-w-2xl font-serif text-[1.02rem] leading-relaxed text-muted">
            Saved stories are stored in this browser only — there is no reader account in this build,
            so your list will not follow you to another device.
          </p>
        </header>

        {items.length === 0 ? (
          <div className="mt-10 border border-rule bg-paper-warm p-10 text-center">
            <h2 className="font-display text-[1.35rem] font-700">Nothing saved yet</h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-muted">
              Use the Save button on any article to keep it here for later.
            </p>
            <Link to="/latest" className="btn-ink btn-md mt-6">Browse latest news</Link>
          </div>
        ) : (
          <>
            <p className="mt-8 font-sans text-[13px] text-muted" role="status">
              {items.length} saved {items.length === 1 ? 'article' : 'articles'}
            </p>
            <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((article) => (
                <div key={article.id}>
                  <ArticleCard article={article} showStandfirst={false} />
                  <button
                    type="button"
                    onClick={() => toggle(article.id)}
                    className="mt-3 font-sans text-[12px] font-medium text-muted underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent"
                  >
                    Remove from saved
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </>
  );
}
