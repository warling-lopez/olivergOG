import { CalendarCheck } from 'lucide-react'
import { ButtonRoute } from '@/components/ui/Button'
import { WhatsAppButton } from './WhatsAppButton'
import { track } from '@/lib/analytics'
import { CTA_LABEL, ROUTES } from '@/config/site'
import { cn } from '@/lib/cn'

/**
 * Par de CTAs. El verbo del primario nunca cambia entre secciones.
 * `location` alimenta la analítica para saber qué bloque convierte.
 */
export function CtaBlock({
  location,
  message,
  size = 'lg',
  className,
  align = 'left',
}: {
  location: string
  message?: string
  size?: 'md' | 'lg'
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row',
        align === 'center' ? 'items-center justify-center' : 'items-stretch sm:items-center',
        className,
      )}
    >
      <ButtonRoute to={ROUTES.agenda} size={size} onClick={() => track('cta_click', { location, label: CTA_LABEL })}>
        <CalendarCheck aria-hidden="true" strokeWidth={1.75} className="size-4" />
        {CTA_LABEL}
      </ButtonRoute>
      <WhatsAppButton message={message} location={location} size={size} />
    </div>
  )
}
