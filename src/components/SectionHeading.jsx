import { Link } from 'react-router-dom';

/**
 * Section header used across the homepage and index pages.
 * A short accent rule above an uppercase section label, with an optional action.
 */
export default function SectionHeading({ title, actionLabel, actionTo, id, className = '' }) {
  return (
    <div className={`mb-6 flex items-end justify-between gap-6 border-t-2 border-ink pt-3 ${className}`}>
      <h2 id={id} className="font-display text-[1.5rem] font-700 leading-none tracking-tight sm:text-[1.75rem]">
        {title}
      </h2>
      {actionLabel && actionTo && (
        <Link
          to={actionTo}
          className="group inline-flex shrink-0 items-center gap-1.5 font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-ink transition-colors hover:text-accent"
        >
          {actionLabel}
          <span aria-hidden="true" className="transition-transform duration-200 ease-editorial group-hover:translate-x-1">
            →
          </span>
        </Link>
      )}
    </div>
  );
}
