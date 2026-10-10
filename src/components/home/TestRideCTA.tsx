import { useState, type FormEvent } from 'react'
import { CalendarDays, CheckCircle2, MapPin, Ruler } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'

const RIDE_IMAGE =
  'https://images.unsplash.com/photo-1778574171671-fbe178537535?auto=format&fit=crop&q=80&w=1400'

const stores = [
  'San Francisco — Harbor Works',
  'Oakland — Broadway',
  'San Jose — Santana Row',
  'Mobile — we come to you',
]

const inputClass =
  'h-12 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 text-[14px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand'

export default function TestRideCTA() {
  const [done, setDone] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDone(true)
  }

  return (
    <section id="test-ride" className="scroll-mt-24 bg-white py-16 lg:py-24">
      <Container>
        <div className="grid overflow-hidden rounded-3xl border border-line lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-[560px]">
            <img
              src={RIDE_IMAGE}
              alt="Riders testing electric bikes"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <span className="eyebrow text-brand">Free Test Ride</span>
              <p className="mt-2 max-w-sm text-[18px] font-semibold leading-snug">
                30 minutes on a real bike beats an hour of reading specs.
              </p>
            </div>
          </div>

          <div className="bg-ink p-7 sm:p-10 lg:p-12">
            {done ? (
              <div className="flex h-full flex-col items-start justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/15">
                  <CheckCircle2 size={26} className="text-brand" />
                </span>
                <h2 className="mt-6 text-[26px] leading-tight text-white">You are booked in.</h2>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
                  We have your slot. A ride specialist will confirm by email within one working hour
                  and have the bikes sized and ready before you arrive.
                </p>
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  className="mt-8 text-[14px] font-semibold text-brand transition-colors hover:text-white"
                >
                  Book another slot
                </button>
              </div>
            ) : (
              <>
                <span className="eyebrow text-brand">Book a test ride</span>
                <h2 className="mt-4 text-[28px] leading-tight text-white sm:text-[34px]">
                  Book a Free Test Ride in 60 seconds.
                </h2>
                <p className="mt-3 text-[14px] leading-relaxed text-white/70">
                  Pick a store, tell us your height and choose a date. We will handle the rest.
                </p>

                <form onSubmit={submit} className="mt-8 flex flex-col gap-5">
                  <div>
                    <label htmlFor="ride-store" className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-white/80">
                      <MapPin size={14} className="text-brand" />
                      Select store
                    </label>
                    <select id="ride-store" required defaultValue="" className={inputClass}>
                      <option value="" disabled>
                        Choose a location
                      </option>
                      {stores.map((store) => (
                        <option key={store} value={store} className="text-ink">
                          {store}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="ride-height" className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-white/80">
                        <Ruler size={14} className="text-brand" />
                        Rider height (in)
                      </label>
                      <input
                        id="ride-height"
                        type="number"
                        min={48}
                        max={90}
                        required
                        placeholder="e.g. 70"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="ride-date" className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-white/80">
                        <CalendarDays size={14} className="text-brand" />
                        Preferred date
                      </label>
                      <input id="ride-date" type="date" required className={`${inputClass} [color-scheme:dark]`} />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 text-[13px] leading-relaxed text-white/70">
                    <input
                      type="checkbox"
                      required
                      className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/25 bg-white/10 accent-brand"
                    />
                    I accept the test-ride waiver and confirm I can ride a bicycle safely.
                  </label>

                  <Button type="submit" size="lg" fullWidth className="mt-1">
                    Book My Slot
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
