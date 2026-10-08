import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { categories } from '../data/categories.js';
import { today } from '../lib/format.js';
import { useBodyLock, useScrollHeader } from '../hooks/index.js';
import BreakingStrip from './BreakingStrip.jsx';
import SearchOverlay from './SearchOverlay.jsx';
import Wordmark from './Wordmark.jsx';

const PRIMARY_NAV = ['world', 'politics', 'business', 'technology', 'science', 'culture', 'sports'];

function NavItem({ slug, name, onNavigate }) {
  return (
    <NavLink
      to={`/section/${slug}`}
      onClick={onNavigate}
      className={({ isActive }) =>
        `relative whitespace-nowrap py-1 font-sans text-[13px] font-medium transition-colors duration-200 ${
          isActive ? 'text-accent' : 'text-ink-soft hover:text-accent'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {name}
          <span
            aria-hidden="true"
            className={`absolute -bottom-0.5 left-0 h-[2px] bg-accent transition-all duration-300 ease-editorial ${
              isActive ? 'w-full' : 'w-0'
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

function MoreMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (ref.current && !ref.current.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => event.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
        className={`flex items-center gap-1 whitespace-nowrap py-1 font-sans text-[13px] font-medium transition-colors ${
          open ? 'text-accent' : 'text-ink-soft hover:text-accent'
        }`}
      >
        More
        <svg width="9" height="6" viewBox="0 0 9 6" aria-hidden="true" className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <path d="M1 1l3.5 3.5L8 1" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 w-56 animate-fade-up border border-rule bg-paper p-2 shadow-lift">
          <ul className="grid gap-0.5">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/section/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 font-sans text-[13px] text-ink-soft transition-colors hover:bg-paper-warm hover:text-accent"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/latest"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 font-sans text-[13px] font-semibold text-ink transition-colors hover:bg-paper-warm hover:text-accent"
              >
                Latest News
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Header() {
  const scrolled = useScrollHeader(140);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useBodyLock(menuOpen || searchOpen);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const navItems = PRIMARY_NAV.map((slug) => categories.find((category) => category.slug === slug));

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 bg-paper shadow-bar">
        {/* Utility bar — collapses once the page scrolls. */}
        <div
          className={`hidden overflow-hidden bg-ink text-white transition-[max-height,opacity] duration-300 ease-editorial lg:block ${
            scrolled ? 'max-h-0 opacity-0' : 'max-h-12 opacity-100'
          }`}
        >
          <div className="shell flex h-9 items-center justify-between gap-8">
            <time dateTime={new Date().toISOString()} className="font-sans text-[11px] tracking-wide text-white/70">
              {today()}
            </time>
            <p className="flex min-w-0 items-center gap-2 font-sans text-[11px] text-white/70">
              <span className="eyebrow text-accent">Trending</span>
              <Link to="/article/global-leaders-reach-critical-agreement" className="truncate transition-colors hover:text-white">
                Global leaders reach critical agreement after intense negotiations
              </Link>
            </p>
            <ul className="flex items-center gap-4 font-sans text-[11px] uppercase tracking-[0.12em] text-white/70">
              <li><a href="#footer-social" className="transition-colors hover:text-white">Newsletters</a></li>
              <li><Link to="/about" className="transition-colors hover:text-white">About</Link></li>
            </ul>
          </div>
        </div>

        {/* Masthead */}
        <div className="shell flex h-[62px] items-center justify-between gap-4 lg:h-[74px]">
          <button
            type="button"
            className="-ml-1 flex h-10 w-10 items-center justify-center lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span className="relative block h-[14px] w-[22px]">
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  aria-hidden="true"
                  className="absolute left-0 block h-[2px] w-full bg-ink transition-all duration-300 ease-editorial"
                  style={{
                    top: index === 0 ? 0 : index === 1 ? 6 : 12,
                    opacity: menuOpen && index === 1 ? 0 : 1,
                    transform: menuOpen
                      ? index === 0
                        ? 'translateY(6px) rotate(45deg)'
                        : index === 2
                          ? 'translateY(-6px) rotate(-45deg)'
                          : 'none'
                      : 'none',
                  }}
                />
              ))}
            </span>
          </button>

          <Link to="/" className="flex shrink-0 items-center" aria-label="THE DAILY EDITION — home">
            <Wordmark />
          </Link>

          <nav aria-label="Sections" className="hidden flex-1 items-center justify-center gap-6 lg:flex xl:gap-7">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `relative whitespace-nowrap py-1 font-sans text-[13px] font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-ink-soft hover:text-accent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  Home
                  <span aria-hidden="true" className={`absolute -bottom-0.5 left-0 h-[2px] bg-accent transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`} />
                </>
              )}
            </NavLink>
            {navItems.slice(0, 6).map((category) => (
              <NavItem key={category.slug} slug={category.slug} name={category.name} />
            ))}
            <MoreMenu />
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-ink-soft transition-colors hover:bg-paper-warm hover:text-accent"
              aria-label="Search articles"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="7.6" cy="7.6" r="5.1" />
                <path d="M11.4 11.4 16 16" strokeLinecap="round" />
              </svg>
            </button>
            <Link
              to="/saved"
              className="hidden h-10 w-10 items-center justify-center rounded-sm text-ink-soft transition-colors hover:bg-paper-warm hover:text-accent sm:flex"
              aria-label="Saved articles"
            >
              <svg width="17" height="18" viewBox="0 0 17 18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.5 1.5h10a1 1 0 0 1 1 1v14l-6-3.6-6 3.6v-14a1 1 0 0 1 1-1Z" />
              </svg>
            </Link>
            <Link to="/subscribe" className="btn-accent btn-sm hidden sm:inline-flex">
              Subscribe
            </Link>
          </div>
        </div>

        <BreakingStrip compact={scrolled} />
      </header>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="fixed inset-x-0 bottom-0 top-[62px] z-30 overflow-y-auto bg-paper lg:hidden"
      >
        <nav aria-label="Mobile sections" className="shell py-6">
          <ul className="grid gap-1">
            <li>
              <Link to="/" className="block border-b border-rule py-3 font-display text-[1.35rem] font-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/latest" className="block border-b border-rule py-3 font-display text-[1.35rem] font-600">
                Latest News
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  to={`/section/${category.slug}`}
                  className="block border-b border-rule py-3 font-display text-[1.35rem] font-600"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <Link to="/saved" className="btn-ghost btn-md w-full">Saved articles</Link>
            <Link to="/subscribe" className="btn-accent btn-md w-full">Subscribe</Link>
          </div>
        </nav>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
