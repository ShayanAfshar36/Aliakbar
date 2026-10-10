import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

interface LogoProps {
  invert?: boolean
  className?: string
}

export default function Logo({ invert = false, className = '' }: LogoProps) {
  return (
    <Link
      to="/"
      aria-label="Voltaro home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-ink transition-transform duration-300 group-hover:-rotate-6">
        <Zap size={17} className="fill-brand text-brand" />
      </span>
      <span
        className={`text-[19px] font-extrabold tracking-[-0.035em] ${
          invert ? 'text-white' : 'text-ink'
        }`}
      >
        Voltaro
      </span>
    </Link>
  )
}
