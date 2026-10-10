import { useMemo, useState } from 'react'
import { Check, Copy, Info, Share2 } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'

type Assist = 'eco' | 'tour' | 'sport'
type Terrain = 'flat' | 'hilly'
type Climate = 'mild' | 'cold'

const assistFactor: Record<Assist, number> = { eco: 1.28, tour: 1, sport: 0.76 }
const assistLabel: Record<Assist, string> = { eco: 'Eco', tour: 'Tour', sport: 'Sport' }

const fieldLabel = 'mb-2 block text-[13px] font-semibold text-ink'
const inputClass =
  'h-12 w-full rounded-xl border border-line bg-white px-4 text-[14px] text-ink outline-none transition-colors focus:border-brand'

function Toggle<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T
  options: { value: T; label: string }[]
  onChange: (value: T) => void
  label: string
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex w-full rounded-xl border border-line bg-white p-1">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={`flex-1 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors ${
            value === option.value ? 'bg-ink text-white' : 'text-muted hover:text-ink'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default function RangeCalculator() {
  const [distance, setDistance] = useState(12)
  const [weight, setWeight] = useState(165)
  const [assist, setAssist] = useState<Assist>('tour')
  const [terrain, setTerrain] = useState<Terrain>('flat')
  const [climate, setClimate] = useState<Climate>('mild')
  const [showFormula, setShowFormula] = useState(false)
  const [copied, setCopied] = useState(false)

  const estimate = useMemo(() => {
    const base = 62
    const weightFactor = Math.min(1.05, Math.max(0.7, 1.05 - (weight - 120) * 0.0018))
    const terrainFactor = terrain === 'hilly' ? 0.82 : 1
    const climateFactor = climate === 'cold' ? 0.85 : 1
    return Math.round(base * weightFactor * assistFactor[assist] * terrainFactor * climateFactor)
  }, [weight, assist, terrain, climate])

  const roundTrips = distance > 0 ? Math.floor(estimate / (distance * 2)) : 0

  const shareUrl = useMemo(() => {
    const params = new URLSearchParams({
      distance: String(distance),
      weight: String(weight),
      assist,
      terrain,
      climate,
    })
    return `${window.location.origin}${window.location.pathname}#range?${params.toString()}`
  }, [distance, weight, assist, terrain, climate])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Voltaro range estimate',
          text: `My estimated e-bike range: ${estimate} miles.`,
          url: shareUrl,
        })
        return
      } catch {
        /* user dismissed — fall through to copy */
      }
    }
    void copyLink()
  }

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Range Calculator"
              title="Will it Make My Commute?"
              description="Adjust your ride and conditions to see a realistic range estimate — the same model our team uses in store."
            />

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="calc-distance" className={fieldLabel}>
                  One-way distance (mi)
                </label>
                <input
                  id="calc-distance"
                  type="number"
                  min={1}
                  max={120}
                  value={distance}
                  onChange={(event) => setDistance(Number(event.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="calc-weight" className={fieldLabel}>
                  Rider weight (lb)
                </label>
                <input
                  id="calc-weight"
                  type="number"
                  min={80}
                  max={350}
                  value={weight}
                  onChange={(event) => setWeight(Number(event.target.value))}
                  className={inputClass}
                />
              </div>
              <div>
                <span className={fieldLabel}>Assist level</span>
                <Toggle
                  label="Assist level"
                  value={assist}
                  onChange={setAssist}
                  options={(['eco', 'tour', 'sport'] as Assist[]).map((value) => ({
                    value,
                    label: assistLabel[value],
                  }))}
                />
              </div>
              <div>
                <span className={fieldLabel}>Terrain</span>
                <Toggle
                  label="Terrain"
                  value={terrain}
                  onChange={setTerrain}
                  options={[
                    { value: 'flat', label: 'Flat' },
                    { value: 'hilly', label: 'Hilly' },
                  ]}
                />
              </div>
              <div className="sm:col-span-2">
                <span className={fieldLabel}>Temperature</span>
                <Toggle
                  label="Temperature"
                  value={climate}
                  onChange={setClimate}
                  options={[
                    { value: 'mild', label: 'Mild (60°F+)' },
                    { value: 'cold', label: 'Cold (below 45°F)' },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-line bg-soft p-7 sm:p-10">
            <span className="eyebrow">Estimated range</span>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-[64px] font-extrabold leading-none tracking-[-0.04em] text-ink sm:text-[84px]">
                {estimate}
              </span>
              <span className="text-[20px] font-semibold text-muted">miles</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {roundTrips > 0
                ? `That is roughly ${roundTrips} round ${roundTrips === 1 ? 'trip' : 'trips'} on your ${distance}-mile commute between charges.`
                : `That covers your ${distance}-mile one-way commute with charge to spare.`}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setShowFormula((open) => !open)}
                aria-expanded={showFormula}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-ink"
              >
                <Info size={15} />
                How we calculate
              </button>
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-ink"
              >
                {copied ? <Check size={15} className="text-brand" /> : <Copy size={15} />}
                {copied ? 'Copied' : 'Copy link'}
              </button>
              <button
                type="button"
                onClick={share}
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-[13px] font-semibold transition-colors hover:border-ink"
              >
                <Share2 size={15} />
                Share
              </button>
            </div>

            <div
              className={`grid transition-all duration-300 ${
                showFormula ? 'mt-6 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="rounded-2xl border border-line bg-white p-5 text-[13px] leading-relaxed text-muted">
                  <p>
                    We start from a 62-mile baseline for a 720Wh pack in Tour mode, then apply four
                    multipliers: rider weight, assist level (Eco +28%, Sport −24%), terrain (hilly
                    −18%) and temperature (cold −15%). Real range varies with tire pressure, wind
                    and how much you pedal.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <Button to="/shop" variant="dark" size="md">
                Find a bike with this range
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
