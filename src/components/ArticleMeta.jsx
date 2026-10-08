import { Link } from 'react-router-dom';
import { getAuthor } from '../data/authors.js';
import { getCategory } from '../data/categories.js';
import { formatDateShort, readingTimeLabel, updatedLabel } from '../lib/format.js';

const TYPE_LABEL = {
  opinion: 'Opinion',
  investigation: 'Investigation',
  analysis: 'Analysis',
  live: 'Live',
  news: null,
};

export function TypeTag({ article, className = '' }) {
  const label = TYPE_LABEL[article.type];
  if (!label) return null;
  const tone =
    article.type === 'opinion'
      ? 'badge-quiet'
      : article.type === 'investigation'
        ? 'badge-ink'
        : article.type === 'live'
          ? 'badge-accent'
          : 'badge-quiet';
  return <span className={`${tone} ${className}`}>{label}</span>;
}

/**
 * Section label. Cards wrap their whole surface in a link, so pass
 * `as="span"` inside them — an anchor may not nest inside another anchor.
 */
export function CategoryTag({ slug, className = '', as = 'link' }) {
  const category = getCategory(slug);
  if (!category) return null;
  const styles = `eyebrow text-accent transition-colors ${className}`;

  if (as === 'span') return <span className={styles}>{category.name}</span>;

  return (
    <Link to={`/section/${slug}`} className={`${styles} hover:text-accent-dark`}>
      {category.name}
    </Link>
  );
}

/** Compact byline: author · date · reading time. */
export default function ArticleMeta({
  article,
  showAuthor = true,
  showReadingTime = true,
  showUpdated = false,
  className = '',
}) {
  const author = getAuthor(article.authorId);
  return (
    <div className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-[12px] text-muted ${className}`}>
      {showAuthor && author && (
        <span className="font-medium text-ink-soft">{author.name}</span>
      )}
      {showAuthor && author && <span aria-hidden="true">·</span>}
      <time dateTime={article.publishedAt}>{formatDateShort(article.publishedAt)}</time>
      {showReadingTime && (
        <>
          <span aria-hidden="true">·</span>
          <span>{readingTimeLabel(article.readingTime)}</span>
        </>
      )}
      {showUpdated && updatedLabel(article) && (
        <span className="w-full text-[11px] italic text-muted">{updatedLabel(article)}</span>
      )}
    </div>
  );
}
