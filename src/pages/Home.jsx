import { Link } from 'react-router-dom';
import Seo from '../components/Seo.jsx';
import LeadStory from '../components/LeadStory.jsx';
import ArticleCard from '../components/ArticleCard.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import TrendingList from '../components/TrendingList.jsx';
import Newsletter from '../components/Newsletter.jsx';
import SmartImage from '../components/SmartImage.jsx';
import ArticleMeta, { CategoryTag, TypeTag } from '../components/ArticleMeta.jsx';
import {
  byCategory,
  editorPicks,
  latestArticles,
  leadArticle,
  mostRead,
  opinionPieces,
  trendingTopics,
} from '../lib/articles.js';
import { getCategory } from '../data/categories.js';

/** Compact side story used beside the lead. */
function SideStory({ article, index }) {
  return (
    <article className={`group border-rule pb-5 ${index > 0 ? 'border-t pt-5' : ''}`}>
      <Link to={`/article/${article.slug}`} className="block">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <CategoryTag slug={article.category} as="span" />
          <TypeTag article={article} />
        </div>
        <h3 className="headline-link font-display text-[1.15rem] font-700 leading-snug">
          {article.headline}
        </h3>
        <ArticleMeta article={article} className="mt-2" />
      </Link>
    </article>
  );
}

/** One category block: a lead card plus a supporting stack. */
function CategoryBlock({ slug, heading }) {
  const category = getCategory(slug);
  const [lead, ...rest] = byCategory(slug, { limit: 4 });
  if (!lead) return null;

  return (
    <section aria-labelledby={`section-${slug}`} className="shell py-12 lg:py-14">
      <SectionHeading
        id={`section-${slug}`}
        title={heading ?? category.name}
        actionLabel="View all"
        actionTo={`/section/${slug}`}
      />
      <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
        <ArticleCard article={lead} variant="wide" showStandfirst priority={false} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {rest.slice(0, 3).map((article, index) => (
            <ArticleCard
              key={article.id}
              article={article}
              variant="list"
              showStandfirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Long-form feature block — deliberately unlike the compact news cards. */
function InDepth() {
  const [feature, ...others] = editorPicks(4);
  if (!feature) return null;

  return (
    <section aria-labelledby="in-depth-heading" className="bg-ink text-white">
      <div className="shell py-14 lg:py-20">
        <div className="mb-8 flex items-end justify-between gap-6 border-t-2 border-white/80 pt-4">
          <div>
            <p className="eyebrow text-accent">Long reads</p>
            <h2 id="in-depth-heading" className="mt-2 font-display text-[1.7rem] font-700 leading-none text-white sm:text-[2rem]">
              In-depth
            </h2>
          </div>
          <Link
            to="/section/investigations"
            className="group inline-flex shrink-0 items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:text-accent"
          >
            All investigations
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          <article className="group">
            <Link to={`/article/${feature.slug}`} className="block">
              <div className="card-media overflow-hidden">
                <SmartImage
                  src={feature.image.src}
                  srcSmall={feature.image.srcSmall}
                  alt={feature.image.alt}
                  ratio="16 / 9"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  imgClassName="group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-5 text-accent">
                {feature.type === 'investigation' ? 'Investigation' : 'Analysis'}
              </p>
              <h3 className="headline-link mt-3 font-display text-[1.75rem] font-700 leading-[1.15] text-white sm:text-[2.1rem]">
                {feature.headline}
              </h3>
              <p className="mt-4 max-w-2xl font-serif text-[1.02rem] leading-relaxed text-white/70">
                {feature.standfirst}
              </p>
              <p className="mt-5 font-sans text-[12px] uppercase tracking-[0.1em] text-white/60">
                {feature.readingTime} min read
                <span aria-hidden="true" className="mx-2">·</span>
                <span className="text-accent">Read the investigation →</span>
              </p>
            </Link>
          </article>

          <div className="grid content-start gap-7">
            {others.slice(0, 3).map((article) => (
              <article key={article.id} className="group border-t border-white/15 pt-6">
                <Link to={`/article/${article.slug}`} className="block">
                  <p className="eyebrow text-white/50">{article.tags[0]}</p>
                  <h3 className="headline-link mt-2 font-display text-[1.2rem] font-700 leading-snug text-white">
                    {article.headline}
                  </h3>
                  <p className="mt-2 font-sans text-[12px] text-white/50">
                    {article.readingTime} min read
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const lead = leadArticle();
  const heroSide = latestArticles(6)
    .filter((article) => article.id !== lead.id)
    .slice(0, 3);
  const topStories = latestArticles(8)
    .filter((article) => article.id !== lead.id && !heroSide.includes(article))
    .slice(0, 4);
  const feed = latestArticles(7).filter((article) => article.id !== lead.id).slice(0, 5);
  const picks = editorPicks(3);
  const ranked = mostRead(6);
  const opinion = opinionPieces(3);

  return (
    <>
      <Seo
        title="Home"
        description="THE DAILY EDITION — independent reporting and analysis on world affairs, politics, business, technology, science, culture and sport."
        image={lead?.image.src}
      />

      <main id="main">
        {/* Lead story + supporting column */}
        <section aria-label="Lead story" className="shell pt-8 lg:pt-10">
          <div className="grid gap-10 lg:grid-cols-[1.75fr_1fr] lg:gap-12">
            <LeadStory article={lead} />
            <div className="lg:border-l lg:border-rule lg:pl-10">
              <p className="eyebrow mb-5 flex items-center gap-2 text-ink">
                <span aria-hidden="true" className="h-[2px] w-6 bg-accent" />
                Also today
              </p>
              <div className="grid gap-5">
                {heroSide.map((article, index) => (
                  <SideStory key={article.id} article={article} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Top stories */}
        <section aria-labelledby="top-stories" className="shell py-12 lg:py-16">
          <SectionHeading id="top-stories" title="Top Stories" actionLabel="View all" actionTo="/latest" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
            {topStories.map((article) => (
              <ArticleCard key={article.id} article={article} showStandfirst={false} />
            ))}
          </div>
        </section>

        {/* Latest news feed + sidebar */}
        <section aria-labelledby="latest-news" className="bg-paper-warm py-12 lg:py-16">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[1.9fr_1fr] lg:gap-14">
              <div>
                <SectionHeading id="latest-news" title="Latest News" actionLabel="All news" actionTo="/latest" />
                <div className="grid gap-6">
                  {feed.map((article) => (
                    <ArticleCard key={article.id} article={article} variant="list" />
                  ))}
                </div>
              </div>

              <aside aria-label="Editor's sidebar" className="grid content-start gap-10">
                <div>
                  <h2 className="eyebrow mb-4 border-t-2 border-ink pt-3 text-ink">Most read</h2>
                  <TrendingList articles={ranked.slice(0, 5)} />
                </div>

                <div>
                  <h2 className="eyebrow mb-4 border-t-2 border-ink pt-3 text-ink">Editor's picks</h2>
                  <div className="grid gap-5">
                    {picks.map((article) => (
                      <ArticleCard key={article.id} article={article} variant="compact" showStandfirst={false} />
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="eyebrow mb-4 border-t-2 border-ink pt-3 text-ink">Trending topics</h2>
                  <ul className="flex flex-wrap gap-2">
                    {trendingTopics().map((topic) => (
                      <li key={topic}>
                        <Link
                          to={`/search?q=${encodeURIComponent(topic)}`}
                          className="badge-quiet transition-colors hover:border-ink hover:text-accent"
                        >
                          {topic}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Newsletter variant="sidebar" />
              </aside>
            </div>
          </div>
        </section>

        <InDepth />

        <CategoryBlock slug="world" />
        <div className="bg-paper-warm">
          <CategoryBlock slug="business" />
        </div>
        <CategoryBlock slug="technology" />

        {/* Opinion */}
        <section aria-labelledby="opinion-heading" className="bg-surface py-12 lg:py-16">
          <div className="shell">
            <SectionHeading id="opinion-heading" title="Opinion" actionLabel="All opinion" actionTo="/section/opinion" />
            <p className="meta mb-8 max-w-2xl">
              Opinion pieces are the views of their authors. They are edited separately from our news
              reporting and are labelled as opinion wherever they appear.
            </p>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {opinion.map((article) => (
                <ArticleCard key={article.id} article={article} showStandfirst />
              ))}
            </div>
          </div>
        </section>

        {/* Most read, full width */}
        <section aria-labelledby="most-read-heading" className="shell py-12 lg:py-16">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div>
              <SectionHeading id="most-read-heading" title="Most Read" />
              <TrendingList articles={ranked} />
            </div>
            <div>
              <SectionHeading title="From our correspondents" />
              <div className="grid gap-6 sm:grid-cols-2">
                {latestArticles(10)
                  .slice(4, 8)
                  .map((article) => (
                    <ArticleCard key={article.id} article={article} showStandfirst={false} />
                  ))}
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
    </>
  );
}
