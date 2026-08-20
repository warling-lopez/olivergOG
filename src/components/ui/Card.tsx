import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/** Superficie elevada. En fondo oscuro la separación es glow + borde interior. */
export function Card({
  children,
  className,
  featured = false,
  interactive = true,
}: {
  children: ReactNode
  className?: string
  featured?: boolean
  interactive?: boolean
}) {
  return (
    <div
      className={cn(
        'relative rounded-card bg-ink-800/60 p-7 backdrop-blur-sm transition-all duration-250 ease-out',
        featured ? 'ring-1 ring-brand-500 glow-soft' : 'ring-hair',
        interactive && 'hover:-translate-y-1 hover:ring-1 hover:ring-brand-500/40 hover:glow-soft',
        className,
      )}
    >
      {children}
    </div>
  )
}
