import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * `tone="gold"` está racionado: máximo 3 apariciones en toda la home
 * (hoy: solo el badge "Más solicitado").
 */
export function Badge({
  children,
  tone = 'brand',
  className,
}: {
  children: ReactNode
  tone?: 'brand' | 'gold'
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill px-3 py-1 font-mono text-xs uppercase tracking-[0.18em]',
        tone === 'gold'
          ? 'bg-gold-400/15 text-gold-400 ring-1 ring-gold-400/35'
          : 'bg-brand-500/12 text-brand-400 ring-1 ring-brand-500/30',
        className,
      )}
    >
      {children}
    </span>
  )
}
