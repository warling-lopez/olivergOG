import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MessageCircle, CalendarCheck } from 'lucide-react'
import { whatsappLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'
import { CTA_LABEL, ROUTES } from '@/config/site'
import { ui } from '@/content/ui'
import { cn } from '@/lib/cn'

/** Barra inferior fija en móvil; aparece al pasar el hero. */
export function StickyCta({ message }: { message?: string }) {
  const { pathname } = useLocation()
  const [visible, setVisible] = useState(
    () => typeof window !== 'undefined' && window.scrollY > window.innerHeight * 0.8,
  )

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-3 border-t border-mist/10 bg-ink-950/95 p-3 backdrop-blur-xl transition-transform duration-300 ease-out md:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <a
        href={whatsappLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track('whatsapp_click', { location: 'sticky', page: pathname })}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn ring-1 ring-mist/25 text-sm font-semibold text-paper"
      >
        <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4" />
        {ui.sticky.whatsapp}
      </a>
      <Link
        to={ROUTES.agenda}
        onClick={() => track('cta_click', { location: 'sticky', label: CTA_LABEL })}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-btn bg-brand-500 text-sm font-semibold text-white"
      >
        <CalendarCheck aria-hidden="true" strokeWidth={1.75} className="size-4" />
        {CTA_LABEL}
      </Link>
    </div>
  )
}
