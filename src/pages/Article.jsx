import { Link, useParams } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import SmartImage from '../components/SmartImage.jsx';
import ArticleBody, { tableOfContents } from '../components/ArticleBody.jsx';
import ArticleTools from '../components/ArticleTools.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import AuthorCard from '../components/AuthorCard.jsx';
import ReadingProgress from '../components/ReadingProgress.jsx';
import { getArticle, byAuthor, byCategory, relatedArticles } from '../lib/articles.js';
import { getAuthor } from '../data/authors.js';
import { getCategory } from '../data/categories.js';
import { formatDate, formatTime, readingTimeLabel, updatedLabel } from '../lib/format.js';
import { useBookmarks } from '../hooks/index.js';
import NotFound from './NotFound.jsx';

export default function Article() {
  const { slug } = useParams();
  const article = getArticle(slug);
  const { isSaved, toggle } = useBookmarks();

  if (!article) return <NotFound />;

  const author = getAuthor(article.authorId);
  const category = getCategory(article.category);
  const related = relatedArticles(article, 3);
  const moreFromCategory = byCategory(article.category, { exclude: [article.id], limit: 4 });
  const moreFromAuthor = author ? byAuthor(author.id, { exclude: [article.id] }).slice(0, 3) : [];
  const toc = tableOfContents(article.body);

  return (
    <>
      <Seo
        title={article.headline}
        description={article.standfirst}
        article={article}
        image={article.image.src}
        type="article"
      />
      <ReadingProgress />

      <main id="main">
        <article className="shell pt-8 lg:pt-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 font-sans text-[12px] text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link to="/" className="hover:text-accent">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to={`/section/${article.category}`} className="hover:text-accent">
                  {category?.name}
                </Link>
              </li>
              <li aria-hidden="true" className="hidden sm:block">/</li>
              <li className="hidden min-w-0 truncate sm:block" aria-current="page">{article.headline}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {article.breaking && <span className="badge-accent">Breaking</span>}
              {article.type !== 'news' && (
                <span className={article.type === 'opinion' ? 'badge-quiet' : 'badge-ink'}>
                  {article.type === 'investigation'
                    ? 'Investigation'
                    : article.type === 'opinion'
                      ? 'Opinion'
                      : 'Analysis'}
                </span>
              )}
              <Link to={`/section/${article.category}`} className="eyebrow text-accent hover:text-accent-dark">
                {category?.name}
              </Link>
            </div>

            <h1 className="mt-4 font-display text-[2rem] font-800 leading-[1.1] tracking-[-0.015em] sm:text-[2.5rem] lg:text-[2.9rem]">
              {article.headline}
            </h1>

            <p className="mx-auto mt-5 max-w-2xl font-serif text-[1.1rem] leading-relaxed text-ink-soft sm:text-[1.2rem]">
              {article.standfirst}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-sans text-[12.5px] text-muted">
              {author && <span className="font-medium text-ink">By {author.name}</span>}
              <span aria-hidden="true">·</span>
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)} · {formatTime(article.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>{readingTimeLabel(article.readingTime)}</span>
            </div>
            {updatedLabel(article) && (
              <p className="mt-2 font-sans text-[12px] italic text-muted">{updatedLabel(article)}</p>
            )}
          </header>

          {/* Lead image */}
          <figure className="mt-8 lg:mt-10">
            <SmartImage
              src={article.image.src}
              srcSmall={article.image.srcSmall}
              alt={article.image.alt}
              ratio="16 / 9"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
            <figcaption className="mx-auto mt-3 max-w-3xl border-l-2 border-rule pl-3 font-sans text-[12px] leading-relaxed text-muted">
              {article.image.caption}
              <span className="mt-1 block italic">{article.image.credit}</span>
            </figcaption>
          </figure>

          {/* Body + contents */}
          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14">
            <aside className="hidden lg:block">
              <div className="sticky top-32">
                {toc.length > 1 && (
                  <nav aria-label="In this article">
                    <p className="eyebrow mb-3 border-t-2 border-ink pt-3 text-ink">In this article</p>
                    <ol className="grid gap-2 border-l border-rule">
                      {toc.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className="-ml-px block border-l-2 border-transparent pl-3 font-sans text-[12.5px] leading-snug text-muted transition-colors hover:border-accent hover:text-accent"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                )}
                <div className="mt-8 border-t border-rule pt-4">
                  <p className="meta">Tags</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {article.tags.map((tag) => (
                      <li key={tag}>
                        <Link to={`/search?q=${encodeURIComponent(tag)}`} className="badge-quiet hover:border-ink hover:text-accent">
                          {tag}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <div className="min-w-0 max-w-[46rem]">
              <ArticleTools
                article={article}
                isSaved={isSaved(article.id)}
                onToggleSave={toggle}
              />
              <div className="mt-8">
                <ArticleBody blocks={article.body} />
              </div>

              <div className="mt-10 lg:hidden">
                <p className="meta">Tags</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {article.tags.map((tag) => (
                    <li key={tag}>
                      <Link to={`/search?q=${encodeURIComponent(tag)}`} className="badge-quiet">
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <AuthorCard author={author} articleCount={byAuthor(article.authorId).length} />
              </div>

              {article.type === 'investigation' && (
                <div className="mt-8 border border-rule bg-paper-warm p-5">
                  <p className="eyebrow text-accent">About this investigation</p>
                  <p className="mt-2 font-serif text-[0.98rem] leading-relaxed text-ink-soft">
                    This article is fictional demonstration content. It is shown here to illustrate
                    how methodology notes, right-of-reply summaries and correction notices are
                    presented on accountability stories.
                  </p>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* Related */}
        <section aria-labelledby="related-heading" className="shell py-14 lg:py-16">
          <SectionHeading id="related-heading" title="Related stories" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ArticleCard key={item.id} article={item} showStandfirst={false} />
            ))}
          </div>
        </section>

        {moreFromCategory.length > 1 && (
          <section aria-labelledby="more-section-heading" className="bg-paper-warm py-14 lg:py-16">
            <div className="shell">
              <SectionHeading
                id="more-section-heading"
                title={`More in ${category?.name}`}
                actionLabel="View section"
                actionTo={`/section/${article.category}`}
              />
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {moreFromCategory.map((item) => (
                  <ArticleCard key={item.id} article={item} variant="compact" showStandfirst={false} />
                ))}
              </div>
            </div>
          </section>
        )}

        {moreFromAuthor.length > 0 && author && (
          <section aria-labelledby="author-heading" className="shell py-14">
            <SectionHeading id="author-heading" title={`More from ${author.name}`} />
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {moreFromAuthor.map((item) => (
                <ArticleCard key={item.id} article={item} variant="compact" showStandfirst={false} />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
