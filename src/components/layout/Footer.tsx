import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import Container from '../ui/Container'
import Logo from './Logo'
import { navItems, site } from '../../data/site'

const shopLinks = [
  { label: 'Commuter', to: '/shop?category=Commuter' },
  { label: 'Cargo', to: '/shop?category=Cargo' },
  { label: 'Mountain', to: '/shop?category=Mountain' },
  { label: 'City & Road', to: '/shop?category=City' },
  { label: 'All bikes', to: '/shop' },
]

const supportLinks = [
  { label: 'Book a test ride', to: '/#test-ride' },
  { label: 'Service & repairs', to: '/services' },
  { label: 'Warranty', to: '/services' },
  { label: 'Financing from $85/mo', to: '/contact' },
  { label: 'Contact us', to: '/contact' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  const subscribe = (event: FormEvent) => {
    event.preventDefault()
    if (!email.trim()) return
    setDone(true)
    setEmail('')
  }

  return (
    <footer className="border-t border-line bg-soft">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              Premium electric bikes engineered for comfort, performance and everyday convenience —
              backed by certified safety and local service.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Youtube, label: 'YouTube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/12 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">Shop</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">Support</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[13px] font-bold uppercase tracking-[0.14em] text-ink">
              Stay in the loop
            </h3>
            <p className="mt-5 text-sm text-muted">
              New models, service tips and ride events. No spam, unsubscribe anytime.
            </p>
            <form onSubmit={subscribe} className="mt-4">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-center gap-2 rounded-full border border-ink/15 bg-white p-1 pl-4 focus-within:border-ink">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/70"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-brand-dark"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
              {done ? (
                <p className="mt-2 text-xs font-semibold text-brand">
                  Thanks — you are on the list.
                </p>
              ) : null}
            </form>

            <ul className="mt-6 flex flex-col gap-3 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-ink" />
                <a href={site.phoneHref} className="transition-colors hover:text-brand">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-ink" />
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-ink" />
                <span>{site.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <nav
          aria-label="Footer"
          className="mt-14 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-8"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[13px] font-medium text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8 flex flex-col items-center justify-between gap-5 border-t border-line pt-8 sm:flex-row">
          <p className="text-[13px] text-muted">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((method) => (
              <span
                key={method}
                className="flex h-7 items-center rounded-md border border-ink/12 bg-white px-2.5 text-[10px] font-bold tracking-wide text-ink/70"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
