import type { ReactNode } from 'react'
import { MessageCircle } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { whatsappLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'
import { CTA_WHATSAPP_LABEL } from '@/config/site'
import type { ButtonSize, ButtonVariant } from '@/components/ui/buttonStyles'

/**
 * Botón que construye y abre el chat con un mensaje contextual a la página.
 * Centraliza el `whatsapp_click` para que ningún enlace se quede sin medir.
 */
export function WhatsAppButton({
  message,
  location,
  children,
  variant = 'secondary',
  size = 'lg',
  className,
}: {
  message?: string
  location: string
  children?: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}) {
  const { pathname } = useLocation()

  return (
    <ButtonLink
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      className={className}
      onClick={() => track('whatsapp_click', { location, page: pathname })}
    >
      <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4" />
      {children ?? CTA_WHATSAPP_LABEL}
    </ButtonLink>
  )
}
