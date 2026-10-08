import { Link } from 'react-router-dom';
import SmartImage from './SmartImage.jsx';

/** Contributor profile card used on article pages and the About page. */
export default function AuthorCard({ author, articleCount, variant = 'inline' }) {
  if (!author) return null;

  if (variant === 'grid') {
    return (
      <article className="border-t border-rule pt-5">
        <SmartImage
          src={author.avatar}
          alt={`Portrait of ${author.name}`}
          ratio="1 / 1"
          className="mb-4 w-20 rounded-sm"
          sizes="80px"
        />
        <h3 className="font-display text-[1.1rem] font-700">{author.name}</h3>
        <p className="eyebrow mt-1 text-accent">{author.role}</p>
        <p className="mt-3 font-serif text-[0.95rem] leading-relaxed text-muted">{author.bio}</p>
        <Link
          to={`/search?q=${encodeURIComponent(author.name)}`}
          className="mt-3 inline-block font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:text-accent"
        >
          More by this writer →
        </Link>
      </article>
    );
  }

  return (
    <div className="flex items-start gap-4 border-y border-rule py-5">
      <SmartImage
        src={author.avatar}
        alt={`Portrait of ${author.name}`}
        ratio="1 / 1"
        className="w-14 shrink-0 rounded-sm"
        sizes="56px"
      />
      <div className="min-w-0">
        <p className="font-sans text-[13px] font-semibold text-ink">{author.name}</p>
        <p className="meta mt-0.5">
          {author.role}
          {author.location ? ` · ${author.location}` : ''}
          {typeof articleCount === 'number' ? ` · ${articleCount} articles` : ''}
        </p>
        <p className="mt-2 font-serif text-[0.94rem] leading-relaxed text-muted">{author.bio}</p>
      </div>
    </div>
  );
}
