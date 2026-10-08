import type { ElementType, ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  as?: ElementType
}

export default function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  return <Tag className={`mx-auto w-full max-w-content px-5 sm:px-8 ${className}`}>{children}</Tag>
}
