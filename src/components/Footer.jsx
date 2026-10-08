import { Link } from 'react-router-dom';
import { categories } from '../data/categories.js';

const EDITORIAL_LINKS = [
  ['Editorial team', '/about#team'],
  ['Our journalistic standards', '/about#standards'],
  ['Corrections policy', '/about#corrections'],
  ['Fact-checking policy', '/about#fact-checking'],
  ['Contact the newsroom', '/about#contact'],
];

const LEGAL_LINKS = [
  ['Privacy policy', '/about#privacy'],
  ['Terms of use', '/about#terms'],
  ['Cookie preferences', '/about#cookies'],
];

const SOCIALS = [
  { name: 'X', href: '#footer-social', path: 'M9.2 7.6 3.6 1h1.9l4.7 5.4L15 1h1.7l-6 6.8L17.2 16h-1.9l-5-5.8L4.9 16H3.2z' },
  { name: 'Facebook', href: '#footer-social', path: 'M11.6 16V9.2h2.3l.4-2.7h-2.7V4.8c0-.8.2-1.3 1.3-1.3h1.5V1.1A18 18 0 0 0 12.2 1C10 1 8.5 2.3 8.5 4.6v2H6.2v2.7h2.3V16z' },
  { name: 'LinkedIn', href: '#footer-social', path: 'M4.4 16H1.7V6.5h2.7zM3 5.3a1.6 1.6 0 1 1 0-3.2 1.6 1.6 0 0 1 0 3.2M16 16h-2.7v-4.6c0-1.1-.4-1.9-1.4-1.9-.8 0-1.2.5-1.4 1.1v5.4H7.8V6.5h2.6v1.2c.4-.6 1.1-1.4 2.5-1.4 1.8 0 3.1 1.2 3.1 3.7z' },
  { name: 'Instagram', href: '#footer-social', path: 'M8.5 1C6.4 1 6.2 1 5.4 1a4.4 4.4 0 0 0-1.6.3A3.3 3.3 0 0 0 2.6 2.6 3.3 3.3 0 0 0 1.3 3.8 4.4 4.4 0 0 0 1 5.4C1 6.2 1 6.4 1 8.5s0 2.3.1 3.1a4.4 4.4 0 0 0 .3 1.6 3.3 3.3 0 0 0 1.2 1.2 3.3 3.3 0 0 0 1.2.7 4.4 4.4 0 0 0 1.6.3c.8.1 1 .1 3.1.1s2.3 0 3.1-.1a4.4 4.4 0 0 0 1.6-.3 3.5 3.5 0 0 0 1.9-1.9 4.4 4.4 0 0 0 .3-1.6c.1-.8.1-1 .1-3.1s0-2.3-.1-3.1a4.4 4.4 0 0 0-.3-1.6 3.3 3.3 0 0 0-.7-1.2 3.3 3.3 0 0 0-1.2-.7A4.4 4.4 0 0 0 11.6 1C10.8 1 10.6 1 8.5 1m0 1.4c2 0 2.3 0 3.1.1.7 0 1.1.1 1.4.3.4.1.6.3.9.6.3.3.4.5.6.9.1.3.3.7.3 1.4 0 .8.1 1.1.1 3.1s0 2.3-.1 3.1c0 .7-.2 1.1-.3 1.4-.2.4-.3.6-.6.9-.3.3-.5.4-.9.6-.3.1-.7.3-1.4.3-.8.1-1.1.1-3.1.1s-2.3 0-3.1-.1c-.7 0-1.1-.2-1.4-.3a2.5 2.5 0 0 1-.9-.6 2.5 2.5 0 0 1-.6-.9c-.1-.3-.3-.7-.3-1.4 0-.8-.1-1.1-.1-3.1s0-2.3.1-3.1c0-.7.2-1.1.3-1.4.2-.4.3-.6.6-.9.3-.3.5-.4.9-.6.3-.1.7-.3 1.4-.3.8-.1 1.1-.1 3.1-.1m0 2.4a3.7 3.7 0 1 0 0 7.4 3.7 3.7 0 0 0 0-7.4m0 6.1a2.4 2.4 0 1 1 0-4.8 2.4 2.4 0 0 1 0 4.8m4.7-6.2a.9.9 0 1 1-1.7 0 .9.9 0 0 1 1.7 0' },
];

function StoreBadge({ store }) {
  const isApple = store === 'apple';
  return (
    <a
      href="#footer-social"
      className="flex items-center gap-2.5 border border-white/15 px-3.5 py-2 transition-colors hover:border-white/40 hover:bg-white/5"
      aria-label={`Download the app on ${isApple ? 'the App Store' : 'Google Play'} (placeholder link)`}
    >
      {isApple ? (
        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true">
          <path d="M13.1 9.5c0-2.2 1.8-3.3 1.9-3.3-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.9-3.6 2.2-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.2 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.1 0 1.9-1 2.6-2.1.8-1.2 1.2-2.4 1.2-2.4s-2.2-.9-2.2-3.5M11 3.3c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-.9 2.6 1 .1 2-.5 2.6-1.2" />
        </svg>
      ) : (
        <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden="true">
          <path d="M.6 1.2 9 9 .6 16.8A1.6 1.6 0 0 1 0 15.6V2.4c0-.5.2-1 .6-1.2m9.6 8.9 2.6 2.4-8.4 4.7zm0-2.2L1.8.2l8.4 4.7zm3.4 1.7 2.1 1.2c.5.3.5.7 0 1l-2.1 1.2-2.7-2.5z" />
        </svg>
      )}
      <span className="leading-tight">
        <span className="block font-sans text-[8.5px] uppercase tracking-[0.14em] text-white/50">
          {isApple ? 'Download on the' : 'Get it on'}
        </span>
        <span className="block font-sans text-[12.5px] font-semibold text-white">
          {isApple ? 'App Store' : 'Google Play'}
        </span>
      </span>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70" id="footer-social">
      <div className="shell grid gap-12 py-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.1fr] lg:gap-10">
        <div>
          <p className="font-display text-[1.4rem] font-800 uppercase leading-none tracking-[-0.01em] text-white">
            The Daily Edition
          </p>
          <p className="mt-4 max-w-xs font-serif text-[0.95rem] leading-relaxed">
            Independent reporting and analysis on world affairs, politics, business, technology,
            science, culture and sport.
          </p>
          <ul className="mt-6 flex items-center gap-2">
            {SOCIALS.map((social) => (
              <li key={social.name}>
                <a
                  href={social.href}
                  aria-label={`${social.name} (placeholder link)`}
                  className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className="eyebrow mb-4 text-white">Explore</h2>
          <ul className="grid gap-2.5 font-sans text-[13px]">
            {[
              ['Home', '/'],
              ['Latest News', '/latest'],
              ['In-depth', '/section/investigations'],
              ['Opinion', '/section/opinion'],
              ['About us', '/about'],
              ['Contact', '/about#contact'],
            ].map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="transition-colors hover:text-white">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-sections">
          <h2 id="footer-sections" className="eyebrow mb-4 text-white">Sections</h2>
          <ul className="grid gap-2.5 font-sans text-[13px]">
            {categories.slice(0, 8).map((category) => (
              <li key={category.slug}>
                <Link to={`/section/${category.slug}`} className="transition-colors hover:text-white">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-editorial">
          <h2 id="footer-editorial" className="eyebrow mb-4 text-white">Editorial</h2>
          <ul className="grid gap-2.5 font-sans text-[13px]">
            {EDITORIAL_LINKS.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="transition-colors hover:text-white">{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div id="footer-legal">
          <h2 className="eyebrow mb-4 text-white">The app</h2>
          <p className="font-sans text-[13px] leading-relaxed">
            Read offline, save stories and follow the sections you care about.
          </p>
          <div className="mt-4 grid gap-2.5">
            <StoreBadge store="apple" />
            <StoreBadge store="android" />
          </div>
          <ul className="mt-6 grid gap-2.5 font-sans text-[13px]">
            {LEGAL_LINKS.map(([label, to]) => (
              <li key={label}>
                <Link to={to} className="transition-colors hover:text-white">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="shell flex flex-col gap-3 py-6 font-sans text-[12px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} THE DAILY EDITION. All rights reserved.</p>
          <p className="max-w-xl text-white/50">
            Demonstration publication. All articles, bylines and quotations on this site are
            fictional placeholder content created for design and development purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
