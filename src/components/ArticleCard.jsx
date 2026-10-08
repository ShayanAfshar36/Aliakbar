import { Link } from 'react-router-dom';
import SmartImage from './SmartImage.jsx';
import ArticleMeta, { CategoryTag, TypeTag } from './ArticleMeta.jsx';

/**
 * The single card primitive for the whole publication.
 * Variants change composition, never data shape.
 */
export default function ArticleCard({
  article,
  variant = 'standard',
  ratio,
  showStandfirst,
  priority = false,
  className = '',
}) {
  const href = `/article/${article.slug}`;
  const withStandfirst =
    typeof showStandfirst === 'boolean' ? showStandfirst : variant === 'standard' || variant === 'lead';

  const headlineSize = {
    lead: 'text-[1.7rem] sm:text-[2.1rem] leading-[1.12]',
    standard: 'text-[1.15rem] leading-snug',
    compact: 'text-[1rem] leading-snug',
    list: 'text-[1.05rem] leading-snug',
    wide: 'text-[1.35rem] leading-tight',
  }[variant];

  const imageRatio = ratio ?? (variant === 'lead' || variant === 'wide' ? '16 / 10' : '3 / 2');

  if (variant === 'list') {
    return (
      <article className={`card card-hover group ${className}`}>
        <Link to={href} className="grid grid-cols-[112px_1fr] gap-4 sm:grid-cols-[168px_1fr] sm:gap-5">
          <div className="card-media rounded-sm">
            <SmartImage
              src={article.image.src}
              srcSmall={article.image.srcSmall}
              alt={article.image.alt}
              ratio="4 / 3"
              sizes="(max-width: 640px) 112px, 168px"
            />
          </div>
          <div className="min-w-0 py-0.5">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <CategoryTag slug={article.category} as="span" />
              <TypeTag article={article} />
            </div>
            <h3 className={`headline-link font-display font-700 ${headlineSize}`}>{article.headline}</h3>
            {withStandfirst && (
              <p className="mt-2 line-clamp-2 font-serif text-[0.95rem] leading-relaxed text-muted">
                {article.standfirst}
              </p>
            )}
            <ArticleMeta article={article} className="mt-3" />
          </div>
        </Link>
      </article>
    );
  }

  if (variant === 'compact') {
    return (
      <article className={`card card-hover group border-b border-rule pb-5 last:border-b-0 last:pb-0 ${className}`}>
        <Link to={href} className="block">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <CategoryTag slug={article.category} as="span" />
            <TypeTag article={article} />
          </div>
          <h3 className={`headline-link font-display font-700 ${headlineSize}`}>{article.headline}</h3>
          <ArticleMeta article={article} className="mt-2" />
        </Link>
      </article>
    );
  }

  return (
    <article className={`card card-hover group ${className}`}>
      <Link to={href} className="block">
        <div className="card-media mb-4 rounded-sm">
          <SmartImage
            src={article.image.src}
            srcSmall={article.image.srcSmall}
            alt={article.image.alt}
            ratio={imageRatio}
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryTag slug={article.category} as="span" />
          <TypeTag article={article} />
        </div>
        <h3 className={`headline-link mt-2 font-display font-700 ${headlineSize}`}>{article.headline}</h3>
        {withStandfirst && (
          <p className="mt-2.5 line-clamp-2 font-serif text-[0.98rem] leading-relaxed text-muted">
            {article.standfirst}
          </p>
        )}
        <ArticleMeta article={article} className="mt-3" />
      </Link>
    </article>
  );
}
