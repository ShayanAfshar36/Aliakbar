import { BatteryCharging, Gauge, Route } from 'lucide-react'
import type { Bike } from '../../data/bikes'

export default function SpecRow({
  bike,
  className = '',
  size = 13,
}: {
  bike: Bike
  className?: string
  size?: number
}) {
  const items = [
    { icon: Route, label: `${bike.range} mi range` },
    { icon: BatteryCharging, label: `${bike.battery} Wh` },
    { icon: Gauge, label: `${bike.topSpeed} mph` },
  ]
  return (
    <ul className={`flex flex-wrap items-center gap-x-4 gap-y-2 ${className}`}>
      {items.map(({ icon: Icon, label }) => (
        <li key={label} className="flex items-center gap-1.5 text-[12px] font-medium text-muted">
          <Icon size={size} className="shrink-0 text-brand" />
          {label}
        </li>
      ))}
    </ul>
  )
}
