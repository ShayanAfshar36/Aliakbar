import { useEffect, useState, type FormEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Heart, Menu, Phone, Search, ShoppingBag, X } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Logo from './Logo'
import { navItems, site } from '../../data/site'
import { useStore } from '../../lib/store'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const { cartCount, favorites, setCartOpen } = useStore()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = query.trim()
    setSearchOpen(false)
    setMobileOpen(false)
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop')
    setQuery('')
  }

  const solid = scrolled || mobileOpen || searchOpen

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-line bg-white/90 backdrop-blur-md'
          : 'border-b border-transparent bg-white'
      }`}
    >
      <Container className="flex h-[68px] items-center justify-between gap-4 lg:h-[76px]">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
                  isActive ? 'text-ink' : 'text-muted hover:text-ink'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-[2px] rounded-full bg-brand transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen((open) => !open)}
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            aria-expanded={searchOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06]"
          >
            {searchOpen ? <X size={19} /> : <Search size={19} />}
          </button>

          <NavLink
            to="/shop?saved=1"
            aria-label="Saved bikes"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] sm:flex"
          >
            <Heart size={19} />
            {favorites.length > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {favorites.length}
              </span>
            ) : null}
          </NavLink>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${cartCount} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06]"
          >
            <ShoppingBag size={19} />
            {cartCount > 0 ? (
              <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>

          <a
            href={site.phoneHref}
            className="ml-1 hidden items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-[13px] font-semibold text-ink transition-colors hover:border-ink xl:inline-flex"
          >
            <Phone size={15} />
            {site.phone}
          </a>

          <Button to="/#test-ride" size="sm" className="ml-1 hidden sm:inline-flex">
            Book Test Ride
          </Button>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="ml-0.5 flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-ink/[0.06] lg:hidden"
          >
            {mobileOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </Container>

      {searchOpen ? (
        <div className="border-t border-line bg-white">
          <Container className="py-4">
            <form onSubmit={submitSearch} className="flex items-center gap-3">
              <Search size={18} className="shrink-0 text-muted" />
              <input
                autoFocus
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search bikes, categories, specs…"
                aria-label="Search bikes"
                className="h-10 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted/70"
              />
              <Button type="submit" size="sm">
                Search
              </Button>
            </form>
          </Container>
        </div>
      ) : null}

      <div
        className={`overflow-hidden border-line bg-white transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          mobileOpen ? 'max-h-[520px] border-t opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <Container className="py-4">
          <nav className="flex flex-col" aria-label="Mobile">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `border-b border-line py-3.5 text-[16px] font-semibold transition-colors ${
                    isActive ? 'text-brand' : 'text-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/shop?saved=1"
              onClick={() => setMobileOpen(false)}
              className="border-b border-line py-3.5 text-[16px] font-semibold text-ink"
            >
              Saved bikes {favorites.length > 0 ? `(${favorites.length})` : ''}
            </NavLink>
          </nav>
          <div className="mt-5 flex flex-col gap-3">
            <Button to="/#test-ride" onClick={() => setMobileOpen(false)} fullWidth size="lg">
              Book Test Ride
            </Button>
            <Button href={site.phoneHref} variant="outline" fullWidth size="lg" icon={<Phone size={16} />}>
              {site.phone}
            </Button>
          </div>
        </Container>
      </div>
    </header>
  )
}
