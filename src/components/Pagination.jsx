import { Fragment } from 'react';
import { Link } from 'react-router-dom';

/**
 * Accessible pager. Renders real links (crawlable, shareable) rather than
 * button-only controls.
 */
export default function Pagination({ page, totalPages, makeHref, label = 'Pagination' }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter(
    (number) =>
      number === 1 ||
      number === totalPages ||
      Math.abs(number - page) <= 1
  );

  const item = (number) => (
    <li key={number}>
      <Link
        to={makeHref(number)}
        aria-current={number === page ? 'page' : undefined}
        className={`flex h-9 min-w-9 items-center justify-center border px-3 font-sans text-[13px] transition-colors ${
          number === page
            ? 'border-ink bg-ink text-white'
            : 'border-rule-strong text-ink-soft hover:border-ink hover:text-accent'
        }`}
      >
        {number}
      </Link>
    </li>
  );

  return (
    <nav aria-label={label} className="mt-10 flex items-center justify-between gap-4 border-t border-rule pt-6">
      {page > 1 ? (
        <Link to={makeHref(page - 1)} className="btn-ghost btn-sm" rel="prev">
          ← Newer
        </Link>
      ) : (
        <span aria-hidden="true" className="btn-ghost btn-sm pointer-events-none opacity-40">← Newer</span>
      )}

      <ul className="flex items-center gap-1.5">
        {pages.map((number, index) => (
          <Fragment key={number}>
            {index > 0 && number - pages[index - 1] > 1 && (
              <li aria-hidden="true" className="px-1 text-muted">…</li>
            )}
            {item(number)}
          </Fragment>
        ))}
      </ul>

      {page < totalPages ? (
        <Link to={makeHref(page + 1)} className="btn-ghost btn-sm" rel="next">
          Older →
        </Link>
      ) : (
        <span aria-hidden="true" className="btn-ghost btn-sm pointer-events-none opacity-40">Older →</span>
      )}
    </nav>
  );
}
