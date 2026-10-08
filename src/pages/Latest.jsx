import { useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import Pagination from '../components/Pagination.jsx';
import TrendingList from '../components/TrendingList.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { allArticles, mostRead, paginate, trendingTopics } from '../lib/articles.js';
import { Link } from 'react-router-dom';

const PER_PAGE = 8;

export default function Latest() {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get('page') ?? 1);
  const items = allArticles();
  const result = paginate(items, page, PER_PAGE);
  const [lead, ...rest] = result.items;

  return (
    <>
      <Seo
        title="Latest News"
        description="The full chronological feed of reporting and analysis from THE DAILY EDITION."
      />

      <main id="main" className="shell py-10 lg:py-12">
        <header className="border-t-2 border-ink pt-4">
          <p className="eyebrow text-accent">Chronological feed</p>
          <h1 className="mt-2 font-display text-[2rem] font-800 leading-none tracking-tight sm:text-[2.5rem]">
            Latest News
          </h1>
          <p className="mt-3 max-w-2xl font-serif text-[1.02rem] leading-relaxed text-muted">
            Every story we have published, newest first. Showing {result.items.length} of{' '}
            {result.total} demonstration articles.
          </p>
        </header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1.9fr_1fr] lg:gap-14">
          <div>
            {lead && (
              <div className="mb-10">
                <ArticleCard article={lead} variant="wide" priority />
              </div>
            )}

            <div className="grid gap-6">
              {rest.map((article) => (
                <ArticleCard key={article.id} article={article} variant="list" />
              ))}
            </div>

            <Pagination
              page={result.page}
              totalPages={result.totalPages}
              makeHref={(number) => (number === 1 ? '/latest' : `/latest?page=${number}`)}
              label="Latest news pagination"
            />

            {result.total === 0 && (
              <p className="border border-rule bg-paper-warm p-6 font-serif text-muted">
                Nothing has been published yet.
              </p>
            )}
          </div>

          <aside aria-label="Latest news sidebar" className="grid content-start gap-10">
            <div>
              <h2 className="eyebrow mb-4 border-t-2 border-ink pt-3 text-ink">Most read</h2>
              <TrendingList articles={mostRead(5)} />
            </div>
            <div>
              <h2 className="eyebrow mb-4 border-t-2 border-ink pt-3 text-ink">Trending topics</h2>
              <ul className="flex flex-wrap gap-2">
                {trendingTopics().map((topic) => (
                  <li key={topic}>
                    <Link to={`/search?q=${encodeURIComponent(topic)}`} className="badge-quiet hover:border-ink hover:text-accent">
                      {topic}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <Newsletter variant="sidebar" />
          </aside>
        </div>
      </main>
    </>
  );
}
