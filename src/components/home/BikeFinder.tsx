import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import Container from '../ui/Container'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import BikeCard from '../bikes/BikeCard'
import { bikes } from '../../data/bikes'

type ClassFilter = 'any' | 'low' | 'high'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step?: number
  suffix: string
  onChange: (value: number) => void
}

function Slider({ label, value, min, max, step = 1, suffix, onChange }: SliderProps) {
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-[13px] font-semibold text-ink">{label}</label>
        <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-[13px] font-bold text-brand">
          {value}
          {suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        aria-label={label}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-line accent-brand"
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-muted">
        <span>
          {min}
          {suffix}
        </span>
        <span>
          {max}
          {suffix}
        </span>
      </div>
    </div>
  )
}

const classOptions: { value: ClassFilter; label: string }[] = [
  { value: 'any', label: 'Any class' },
  { value: 'low', label: 'Class 1 & 2' },
  { value: 'high', label: 'Class 3' },
]

export default function BikeFinder() {
  const [range, setRange] = useState(40)
  const [load, setLoad] = useState(250)
  const [hills, setHills] = useState(55)
  const [height, setHeight] = useState(70)
  const [bikeClass, setBikeClass] = useState<ClassFilter>('any')
  const [submitted, setSubmitted] = useState(false)

  const matches = useMemo(
    () =>
      bikes.filter((bike) => {
        if (bike.range < range) return false
        if (bike.maxLoad < load) return false
        if (bike.torque < hills) return false
        if (height < bike.riderHeight[0] || height > bike.riderHeight[1]) return false
        if (bikeClass === 'low' && bike.bikeClass === 'Class 3') return false
        if (bikeClass === 'high' && bike.bikeClass !== 'Class 3') return false
        return true
      }),
    [range, load, hills, height, bikeClass],
  )

  return (
    <section className="bg-white py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Bike Finder"
          title="Choose by Numbers, Not Guesswork."
          description="Set your commute, load and terrain — we will show only the bikes that genuinely fit how you ride."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-12 grid gap-8 rounded-3xl border border-line bg-soft p-6 lg:grid-cols-[1.5fr_1fr] lg:p-10">
          <div className="grid gap-7 sm:grid-cols-2">
            <Slider
              label="Range needed"
              value={range}
              min={20}
              max={70}
              suffix=" mi"
              onChange={setRange}
            />
            <Slider
              label="Max load"
              value={load}
              min={150}
              max={450}
              step={10}
              suffix=" lb"
              onChange={setLoad}
            />
            <Slider
              label="Hills & torque"
              value={hills}
              min={30}
              max={110}
              step={5}
              suffix=" Nm"
              onChange={setHills}
            />
            <Slider
              label="Rider height"
              value={height}
              min={58}
              max={80}
              suffix=" in"
              onChange={setHeight}
            />

            <div className="sm:col-span-2">
              <span className="text-[13px] font-semibold text-ink">Bike class</span>
              <div
                role="group"
                aria-label="Bike class"
                className="mt-3 inline-flex rounded-full border border-line bg-white p-1"
              >
                {classOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setBikeClass(option.value)}
                    aria-pressed={bikeClass === option.value}
                    className={`rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                      bikeClass === option.value
                        ? 'bg-ink text-white'
                        : 'text-muted hover:text-ink'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-line bg-white p-6">
            <div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-tint">
                <Sparkles size={19} className="text-brand" />
              </span>
              <p className="mt-5 text-[44px] font-extrabold leading-none text-ink">
                {matches.length}
              </p>
              <p className="mt-2 text-[14px] text-muted">
                {matches.length === 1
                  ? 'bike matches your numbers'
                  : 'bikes match your numbers'}
              </p>
              <dl className="mt-6 space-y-2 border-t border-line pt-5 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-muted">Range</dt>
                  <dd className="font-semibold">{range}+ mi</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Load</dt>
                  <dd className="font-semibold">{load}+ lb</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Torque</dt>
                  <dd className="font-semibold">{hills}+ Nm</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted">Height</dt>
                  <dd className="font-semibold">{height} in</dd>
                </div>
              </dl>
            </div>
            <Button
              fullWidth
              size="lg"
              className="mt-8"
              onClick={() => setSubmitted(true)}
            >
              Show Matching Bikes
            </Button>
          </div>
        </div>

        {submitted ? (
          <div className="mt-12">
            <h3 className="text-[15px] font-bold uppercase tracking-[0.14em] text-muted">
              {matches.length} matching {matches.length === 1 ? 'bike' : 'bikes'}
            </h3>
            {matches.length > 0 ? (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {matches.map((bike, index) => (
                  <Reveal key={bike.id} delay={index * 60}>
                    <BikeCard bike={bike} />
                  </Reveal>
                ))}
              </div>
            ) : (
              <p className="mt-6 rounded-2xl border border-dashed border-line bg-soft p-8 text-center text-[15px] text-muted">
                No bike matches those numbers yet. Try widening the range or lowering the load — or
                talk to us and we will build something that fits.
              </p>
            )}
          </div>
        ) : null}
      </Container>
    </section>
  )
}
