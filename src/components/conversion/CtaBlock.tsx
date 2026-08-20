import { CalendarCheck, MessageCircle } from 'lucide-react'
import { ButtonLink, ButtonRoute } from '@/components/ui/Button'
import { whatsappLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'
import { CTA_LABEL, CTA_WHATSAPP_LABEL, ROUTES } from '@/config/site'
import { useLocation } from 'react-router-dom'
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
  const { pathname } = useLocation()

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
      <ButtonLink
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        size={size}
        onClick={() => track('whatsapp_click', { location, page: pathname })}
      >
        <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4" />
        {CTA_WHATSAPP_LABEL}
      </ButtonLink>
    </div>
  )
}
