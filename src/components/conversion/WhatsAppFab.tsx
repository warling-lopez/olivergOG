import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'
import { ui } from '@/content/ui'

/** Flotante solo en desktop: en móvil manda StickyCta y no debe tapar el footer. */
export function WhatsAppFab({ message }: { message?: string }) {
  return (
    <a
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ui.a11y.whatsappFab}
      onClick={() => track('whatsapp_click', { location: 'fab', page: window.location.pathname })}
      className="fixed bottom-8 right-8 z-50 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-ink-950 transition-transform duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 md:flex"
    >
      <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-6" />
    </a>
  )
}
