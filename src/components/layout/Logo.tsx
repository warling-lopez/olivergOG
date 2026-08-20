import { Link } from 'react-router-dom'
import { ROUTES } from '@/config/site'
import { ui } from '@/content/ui'
import { cn } from '@/lib/cn'

/** Monograma OG: barra diagonal a 20° entre las dos letras. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to={ROUTES.home}
      aria-label={ui.a11y.logoAlt}
      className={cn(
        'inline-flex items-center font-display text-2xl font-black leading-none tracking-tight text-paper',
        className,
      )}
    >
      <span>O</span>
      <span aria-hidden="true" className="mx-1 inline-block h-6 w-[3px] rotate-20 rounded-full bg-brand-500" />
      <span>G</span>
    </Link>
  )
}
