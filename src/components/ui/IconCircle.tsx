import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * Círculo de 56 px. Al hacer hover en la card contenedora (grupo `card`)
 * se rellena de azul y el ícono pasa a blanco.
 */
export function IconCircle({ icon: Icon, className }: { icon: LucideIcon; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-14 items-center justify-center rounded-full bg-brand-500/12 ring-1 ring-brand-500/30 transition-colors duration-250 group-hover/card:bg-brand-500',
        className,
      )}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.75}
        className="size-6 text-brand-400 transition-colors duration-250 group-hover/card:text-white"
      />
    </span>
  )
}
