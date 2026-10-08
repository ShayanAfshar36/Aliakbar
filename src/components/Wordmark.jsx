import { Link } from 'react-router-dom';

/**
 * Publication wordmark. The masthead mark is deliberately typographic —
 * a serif nameplate with an accent rule, in the tradition of printed dailies.
 */
export default function Wordmark({ compact = false }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="flex h-8 w-8 shrink-0 flex-col justify-center gap-[3px] bg-ink px-[6px]"
      >
        <span className="block h-[2px] w-full bg-accent" />
        <span className="block h-[2px] w-full bg-white/85" />
        <span className="block h-[2px] w-2/3 bg-white/85" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display font-800 uppercase leading-[0.95] tracking-[-0.01em] text-ink ${
            compact ? 'text-[1.05rem]' : 'text-[1.15rem] sm:text-[1.35rem]'
          }`}
        >
          The Daily
        </span>
        <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.42em] text-muted">
          Edition
        </span>
      </span>
    </span>
  );
}

export function WordmarkLink({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex ${className}`} aria-label="THE DAILY EDITION — home">
      <Wordmark />
    </Link>
  );
}
