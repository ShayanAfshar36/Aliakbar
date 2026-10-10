import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  invert?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
  invert = false,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex max-w-2xl flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <span className={`eyebrow mb-4 ${invert ? 'text-brand' : ''}`}>{eyebrow}</span>
      ) : null}
      <h2
        className={`text-3xl leading-[1.08] sm:text-4xl lg:text-[44px] ${
          invert ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-relaxed ${invert ? 'text-white/70' : 'text-muted'}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
