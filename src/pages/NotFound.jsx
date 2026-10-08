import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import { latestArticles } from '../lib/articles.js';

export default function NotFound() {
  const suggestions = latestArticles(3);

  return (
    <>
      <Seo title="Page not found" description="The page you requested does not exist." noIndex />

      <main id="main" className="shell py-16 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-accent">Error 404</p>
          <h1 className="mt-3 font-display text-[2.2rem] font-800 leading-tight sm:text-[2.8rem]">
            We could not find that page
          </h1>
          <p className="mt-4 font-serif text-[1.05rem] leading-relaxed text-muted">
            The link may be out of date, or the article may have been moved. Try the front page or
            search the archive.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-ink btn-md">Front page</Link>
            <Link to="/latest" className="btn-ghost btn-md">Latest news</Link>
            <Link to="/search" className="btn-ghost btn-md">Search</Link>
          </div>
        </div>

        <section aria-labelledby="notfound-suggestions" className="mt-16">
          <h2 id="notfound-suggestions" className="border-t-2 border-ink pt-3 font-display text-[1.4rem] font-700">
            Latest stories
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((article) => (
              <ArticleCard key={article.id} article={article} showStandfirst={false} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
