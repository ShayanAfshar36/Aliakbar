import { Link } from 'react-router-dom';
import { getCategoryName } from '../data/categories.js';
import { formatDateShort } from '../lib/format.js';

/**
 * Numbered editorial ranking list.
 *
 * The ranking is editorially curated (`mostReadRank` in the dataset) rather
 * than derived from analytics — no readership figures are implied.
 */
export default function TrendingList({ articles, label = 'Editorially curated', showDate = true }) {
  if (!articles.length) return null;

  return (
    <div>
      <ol className="grid">
        {articles.map((article, index) => (
          <li key={article.id} className="border-b border-rule last:border-b-0">
            <Link to={`/article/${article.slug}`} className="group flex items-start gap-4 py-4">
              <span
                aria-hidden="true"
                className="w-7 shrink-0 font-display text-[1.6rem] font-700 leading-none text-rule-strong transition-colors group-hover:text-accent"
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="eyebrow block text-accent">{getCategoryName(article.category)}</span>
                <span className="headline-link mt-1 block font-display text-[1.02rem] font-700 leading-snug">
                  {article.headline}
                </span>
                {showDate && <span className="meta mt-1 block">{formatDateShort(article.publishedAt)}</span>}
              </span>
            </Link>
          </li>
        ))}
      </ol>
      <p className="meta mt-3 italic">{label} — not measured from analytics.</p>
    </div>
  );
}
