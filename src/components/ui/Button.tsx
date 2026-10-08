import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'dark' | 'outline' | 'ghost' | 'light'
type Size = 'sm' | 'md' | 'lg'

interface CommonProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
  children: ReactNode
  icon?: ReactNode
  onClick?: () => void
}

interface ButtonAsButton
  extends CommonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'onClick'> {
  to?: undefined
  href?: undefined
}

interface ButtonAsLink extends CommonProps {
  to: string
  href?: undefined
}

interface ButtonAsAnchor extends CommonProps {
  href: string
  to?: undefined
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] whitespace-nowrap transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-[0_14px_34px_-16px_rgba(255,122,0,0.85)] hover:bg-brand-dark hover:-translate-y-0.5',
  dark: 'bg-ink text-white hover:bg-black hover:-translate-y-0.5 shadow-[0_14px_34px_-18px_rgba(11,11,11,0.7)]',
  outline: 'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-white',
  ghost: 'text-ink hover:bg-ink/[0.06]',
  light: 'bg-white text-ink hover:bg-white/90 hover:-translate-y-0.5 shadow-sm',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-[52px] px-8 text-[15px]',
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
    icon,
    onClick,
    ...rest
  } = props as CommonProps & { to?: string; href?: string }

  const classes = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <>
      {children}
      {icon ? <span className="shrink-0">{icon}</span> : null}
    </>
  )

  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={classes} onClick={onClick}>
        {content}
      </Link>
    )
  }

  if ('href' in props && props.href) {
    return (
      <a href={props.href} className={classes} onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button
      className={classes}
      onClick={onClick}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  )
}
