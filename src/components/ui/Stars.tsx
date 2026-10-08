import { Star } from 'lucide-react'

interface StarsProps {
  rating: number
  size?: number
  className?: string
}

export default function Stars({ rating, size = 14, className = '' }: StarsProps) {
  const rounded = Math.round(rating)
  return (
    <span
      className={`inline-flex items-center gap-0.5 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={1.5}
          className={i < rounded ? 'fill-brand text-brand' : 'text-ink/25'}
        />
      ))}
    </span>
  )
}
