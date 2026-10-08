import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2, Clock, Mail, MapPin, Phone } from 'lucide-react'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import { site } from '../data/site'
import { getBikeById } from '../data/bikes'
import { formatPrice } from '../lib/format'
import { useStore } from '../lib/store'

const topics = [
  'Book a test ride',
  'Buying advice',
  'Service & repair',
  'Battery health check',
  'Fleet & corporate',
  'Something else',
]

const inputClass =
  'h-12 w-full rounded-xl border border-line bg-white px-4 text-[14px] text-ink outline-none transition-colors focus:border-brand'

export default function ContactPage() {
  const [params] = useSearchParams()
  const { cart } = useStore()
  const [done, setDone] = useState(false)
  const orderIntent = params.get('intent') === 'order'

  const cartLines = cart
    .map((line) => ({ line, bike: getBikeById(line.id) }))
    .filter((entry): entry is { line: { id: string; qty: number }; bike: NonNullable<ReturnType<typeof getBikeById>> } =>
      Boolean(entry.bike),
    )
  const subtotal = cartLines.reduce((sum, { line, bike }) => sum + bike.price * line.qty, 0)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDone(true)
  }

  const details = [
    { icon: Phone, label: 'Phone', value: site.phone, href: site.phoneHref },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: 'Workshop', value: site.address },
    { icon: Clock, label: 'Opening hours', value: site.hours },
  ]

  return (
    <div className="bg-white">
      <section className="border-b border-line bg-soft py-14 lg:py-20">
        <Container>
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 max-w-2xl text-[34px] leading-tight sm:text-[46px]">
            Let us help you find the right ride.
          </h1>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted">
            Questions about a bike, a service booking or a fleet enquiry — send us a note and a real
            person will get back to you the same working day.
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
            <div>
              {orderIntent && cartLines.length > 0 ? (
                <div className="mb-8 rounded-2xl border border-brand/25 bg-brand-tint p-6">
                  <h2 className="text-[15px] font-bold text-ink">Your order request</h2>
                  <ul className="mt-4 flex flex-col gap-2.5">
                    {cartLines.map(({ line, bike }) => (
                      <li key={bike.id} className="flex justify-between text-[14px] text-ink">
                        <span>
                          {bike.name} × {line.qty}
                        </span>
                        <span className="font-semibold">{formatPrice(bike.price * line.qty)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex justify-between border-t border-brand/20 pt-3 text-[15px] font-bold text-ink">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">
                    Send the form below and we will confirm availability, delivery and payment by
                    email.
                  </p>
                </div>
              ) : null}

              {done ? (
                <div className="rounded-3xl border border-line bg-soft p-8 sm:p-10">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
                    <CheckCircle2 size={26} className="text-brand" />
                  </span>
                  <h2 className="mt-6 text-[24px]">Message received.</h2>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                    Thanks for getting in touch. A Voltaro specialist will reply within one working
                    day — usually much sooner.
                  </p>
                  <button
                    type="button"
                    onClick={() => setDone(false)}
                    className="mt-6 text-[14px] font-semibold text-brand transition-colors hover:text-ink"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-[13px] font-semibold text-ink">
                        Full name
                      </label>
                      <input id="name" name="name" required placeholder="Alex Rivera" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-[13px] font-semibold text-ink">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="mb-2 block text-[13px] font-semibold text-ink">
                        Phone (optional)
                      </label>
                      <input id="phone" name="phone" type="tel" placeholder="(415) 000-0000" className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="topic" className="mb-2 block text-[13px] font-semibold text-ink">
                        How can we help?
                      </label>
                      <select
                        id="topic"
                        name="topic"
                        required
                        defaultValue={orderIntent ? 'Buying advice' : ''}
                        className={inputClass}
                      >
                        <option value="" disabled>
                          Choose a topic
                        </option>
                        {topics.map((topic) => (
                          <option key={topic} value={topic}>
                            {topic}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-[13px] font-semibold text-ink">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your commute, the bikes you are considering, or the service you need…"
                      className="w-full rounded-xl border border-line bg-white p-4 text-[14px] text-ink outline-none transition-colors focus:border-brand"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button type="submit" size="lg">
                      Send message
                    </Button>
                    <Button to="/#test-ride" variant="outline" size="lg">
                      Book a test ride instead
                    </Button>
                  </div>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-5">
              {details.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 rounded-2xl border border-line p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-tint">
                    <Icon size={18} className="text-brand" />
                  </span>
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 block text-[15px] font-semibold text-ink transition-colors hover:text-brand"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 text-[15px] font-semibold text-ink">{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div className="overflow-hidden rounded-2xl border border-line">
                <img
                  src="https://images.unsplash.com/photo-1621394445346-c7b502f07206?auto=format&fit=crop&q=80&w=900"
                  alt="Voltaro workshop"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex items-center justify-between gap-4 p-5">
                  <p className="text-[14px] text-muted">
                    Visit the workshop for fittings, service and same-day repairs.
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-[13px] font-semibold text-brand transition-colors hover:text-ink"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
