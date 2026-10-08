import { Link } from 'react-router-dom';
import SmartImage from './SmartImage.jsx';
import ArticleMeta, { CategoryTag, TypeTag } from './ArticleMeta.jsx';

/**
 * The lead story: the dominant visual moment of the front page.
 * A large image-led composition with the headline set beneath it, matching
 * the reference layout's left-aligned lead card.
 */
export default function LeadStory({ article, className = '' }) {
  if (!article) return null;

  return (
    <article className={`group ${className}`}>
      <Link to={`/article/${article.slug}`} className="block">
        <div className="card-media animate-image-reveal overflow-hidden rounded-sm">
          <SmartImage
            src={article.image.src}
            srcSmall={article.image.srcSmall}
            alt={article.image.alt}
            ratio="16 / 10"
            priority
            sizes="(max-width: 1024px) 100vw, 62vw"
            imgClassName="group-hover:scale-[1.03]"
          />
        </div>

        <div className="mt-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            {article.breaking && <span className="badge-accent">Breaking</span>}
            <CategoryTag slug={article.category} as="span" />
            <TypeTag article={article} />
          </div>

          <h1 className="font-display text-[1.95rem] font-800 leading-[1.08] tracking-[-0.015em] sm:text-[2.4rem] lg:text-[2.75rem]">
            <span className="headline-link">{article.headline}</span>
          </h1>

          <p className="mt-4 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-ink-soft sm:text-[1.1rem]">
            {article.standfirst}
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-4">
            <ArticleMeta article={article} showUpdated />
            <span className="inline-flex items-center gap-2 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors group-hover:text-accent">
              Read full story
              <span aria-hidden="true" className="transition-transform duration-200 ease-editorial group-hover:translate-x-1">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
