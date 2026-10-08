import { Link } from 'react-router-dom'
import Container from '../ui/Container'
import SectionHeading from '../ui/SectionHeading'
import { getBikeById, type Bike } from '../../data/bikes'
import { compareRows } from '../../data/site'

const columns = ['commuter-pro-500', 'cargo-plus-750', 'trail-mtb-700']
  .map((id) => getBikeById(id))
  .filter((bike): bike is Bike => Boolean(bike))

const betterIs: Record<string, 'max' | 'min' | undefined> = {
  topSpeed: 'max',
  range: 'max',
  battery: 'max',
  torque: 'max',
  weight: 'min',
}

function cellValue(bike: Bike, key: string): string {
  switch (key) {
    case 'topSpeed':
      return `${bike.topSpeed} mph`
    case 'range':
      return `${bike.range} mi`
    case 'battery':
      return `${bike.battery} Wh`
    case 'torque':
      return `${bike.torque} Nm`
    case 'weight':
      return `${bike.weight} lbs`
    default:
      return String((bike as unknown as Record<string, unknown>)[key] ?? '—')
  }
}

function numeric(bike: Bike, key: string): number | null {
  const value = (bike as unknown as Record<string, unknown>)[key]
  return typeof value === 'number' ? value : null
}

function isBest(key: string, bike: Bike): boolean {
  const direction = betterIs[key]
  if (!direction) return false
  const values = columns.map((column) => numeric(column, key)).filter((v): v is number => v !== null)
  if (values.length < 2) return false
  const target = direction === 'max' ? Math.max(...values) : Math.min(...values)
  return numeric(bike, key) === target
}

export default function ComparisonTable() {
  return (
    <section className="border-y border-line bg-soft py-16 lg:py-24">
      <Container>
        <SectionHeading
          eyebrow="Comparison"
          title="Compare 2–4 Bikes."
          description="The specs that actually change how a bike feels, side by side. The strongest value in each row is highlighted."
          align="center"
          className="mx-auto text-center"
        />

        <div className="mt-12 overflow-x-auto rounded-3xl border border-line bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <caption className="sr-only">Specification comparison of three Voltaro bikes</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="sticky left-0 z-10 bg-white px-6 py-5 text-[12px] font-semibold uppercase tracking-[0.16em] text-muted">
                  Specifications
                </th>
                {columns.map((bike) => (
                  <th key={bike.id} scope="col" className="px-6 py-5 align-bottom">
                    <Link to={`/bikes/${bike.slug}`} className="group flex flex-col gap-3">
                      <img
                        src={bike.images[0]}
                        alt=""
                        loading="lazy"
                        className="h-16 w-24 rounded-lg object-cover"
                      />
                      <span className="text-[15px] font-bold text-ink transition-colors group-hover:text-brand">
                        {bike.name}
                      </span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, rowIndex) => (
                <tr
                  key={row.key}
                  className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-soft/60'}
                >
                  <th
                    scope="row"
                    className={`sticky left-0 z-10 px-6 py-4 text-[13px] font-semibold text-ink ${
                      rowIndex % 2 === 0 ? 'bg-white' : 'bg-[#faf9f7]'
                    }`}
                  >
                    {row.label}
                  </th>
                  {columns.map((bike) => {
                    const best = isBest(row.key, bike)
                    return (
                      <td key={bike.id} className="px-6 py-4 text-[14px]">
                        <span
                          className={
                            best
                              ? 'inline-flex rounded-full bg-brand-tint px-3 py-1 font-bold text-brand'
                              : 'text-muted'
                          }
                        >
                          {cellValue(bike, row.key)}
                        </span>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}
