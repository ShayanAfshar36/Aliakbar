import { Link, useParams, useSearchParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import Pagination from '../components/Pagination.jsx';
import TrendingList from '../components/TrendingList.jsx';
import Newsletter from '../components/Newsletter.jsx';
import { byCategory, mostRead, paginate } from '../lib/articles.js';
import { categories, getCategory } from '../data/categories.js';
import { getAuthor } from '../data/authors.js';
import { formatDateTime } from '../lib/format.js';

const PER_PAGE = 6;

export default function Category() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const category = getCategory(slug);
  const page = Number(params.get('page') ?? 1);

  if (!category) {
    return (
      <main id="main" className="shell py-20 text-center">
        <Seo title="Section not found" noIndex />
        <h1 className="font-display text-[2rem] font-700">Section not found</h1>
        <p className="mt-3 font-serif text-muted">
          That section does not exist. Try one of the sections below.
        </p>
        <ul className="mt-6 flex flex-wrap justify-center gap-2">
          {categories.map((item) => (
            <li key={item.slug}>
              <Link to={`/section/${item.slug}`} className="badge-quiet hover:border-ink hover:text-accent">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  }

  const items = byCategory(slug);
  const result = paginate(items, page, PER_PAGE);
  const [featured, ...rest] = result.items;
  const isFirstPage = result.page === 1;
  const editor = featured ? getAuthor(featured.authorId) : null;

  return (
    <>
      <Seo
        title={category.name}
        description={category.description}
        image={items[0]?.image.src}
      />

      <main id="main">
        <header className="bg-ink text-white">
          <div className="shell py-12 lg:py-16">
            <nav aria-label="Breadcrumb" className="mb-5 font-sans text-[12px] text-white/50">
              <Link to="/" className="hover:text-white">Home</Link>
              <span aria-hidden="true" className="mx-2">/</span>
              <span aria-current="page">{category.name}</span>
            </nav>
            <h1 className="font-display text-[2.2rem] font-800 leading-none tracking-tight sm:text-[3rem]">
              {category.name}
            </h1>
            <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-white/70">
              {category.intro}
            </p>
            <p className="mt-5 font-sans text-[12px] uppercase tracking-[0.12em] text-white/50">
              {items.length} {items.length === 1 ? 'article' : 'articles'} in this section
            </p>
          </div>
        </header>

        <div className="shell py-12 lg:py-14">
          {items.length === 0 ? (
            <div className="border border-rule bg-paper-warm p-10 text-center">
              <h2 className="font-display text-[1.4rem] font-700">No stories in this section yet</h2>
              <p className="mx-auto mt-3 max-w-md font-serif text-muted">
                We have not published anything here so far. Browse the other sections or search the
                archive.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link to="/latest" className="btn-ink btn-md">Latest news</Link>
                <Link to="/search" className="btn-ghost btn-md">Search</Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-[1.9fr_1fr] lg:gap-14">
              <div>
                {isFirstPage && featured && (
                  <div className="mb-12 border-b border-rule pb-10">
                    <p className="eyebrow mb-4 text-accent">Featured in {category.name}</p>
                    <div className="grid gap-8 lg:grid-cols-2">
                      <ArticleCard article={featured} showStandfirst priority />
                      <div className="border-t border-rule pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                        <h2 className="font-display text-[1.3rem] font-700 leading-snug">
                          {featured.headline}
                        </h2>
                        <p className="mt-3 font-serif text-[0.98rem] leading-relaxed text-muted">
                          {featured.standfirst}
                        </p>
                        {editor && (
                          <p className="mt-4 font-sans text-[12px] text-muted">
                            {editor.name} · {editor.role}
                          </p>
                        )}
                        <p className="mt-1 font-sans text-[12px] text-muted">
                          Published {formatDateTime(featured.publishedAt)}
                        </p>
                        <Link
                          to={`/article/${featured.slug}`}
                          className="mt-5 inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] transition-colors hover:text-accent"
                        >
                          Read the story →
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-8 sm:grid-cols-2">
                  {(isFirstPage ? rest : result.items).map((article) => (
                    <ArticleCard key={article.id} article={article} showStandfirst />
                  ))}
                </div>

                <Pagination
                  page={result.page}
                  totalPages={result.totalPages}
                  makeHref={(number) =>
                    number === 1 ? `/section/${slug}` : `/section/${slug}?page=${number}`
                  }
                  label={`${category.name} pagination`}
                />
              </div>

              <aside aria-label={`${category.name} sidebar`} className="grid content-start gap-10">
                <div>
                  <h2 className="eyebrow mb-4 border-t-2 border-ink pt-3 text-ink">Most read</h2>
                  <TrendingList articles={mostRead(5)} />
                </div>
                <div>
                  <h2 className="eyebrow mb-4 border-t-2 border-ink pt-3 text-ink">Other sections</h2>
                  <ul className="flex flex-wrap gap-2">
                    {categories
                      .filter((item) => item.slug !== slug)
                      .map((item) => (
                        <li key={item.slug}>
                          <Link to={`/section/${item.slug}`} className="badge-quiet hover:border-ink hover:text-accent">
                            {item.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <Newsletter variant="sidebar" />
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
