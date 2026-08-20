import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE, ROUTES } from '@/config/site'
import { track } from '@/lib/analytics'
import { ui } from '@/content/ui'

const SCRIPT_SRC = 'https://assets.calendly.com/assets/external/widget.js'

/** Colores del widget alineados a la paleta del sitio. */
function calendlyUrl(): string {
  const params = new URLSearchParams({
    hide_gdpr_banner: '1',
    background_color: '071233',
    text_color: 'F7F9FC',
    primary_color: '1E6BFF',
  })
  return `${SITE.calendlyUrl}?${params.toString()}`
}

/** El script solo se inyecta cuando el widget entra en viewport. */
function loadCalendlyScript(): void {
  if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return
  const script = document.createElement('script')
  script.src = SCRIPT_SRC
  script.async = true
  document.body.appendChild(script)
}

function isCalendlyEvent(event: MessageEvent): boolean {
  return (
    typeof event.origin === 'string' &&
    event.origin.includes('calendly.com') &&
    typeof event.data === 'object' &&
    event.data !== null &&
    'event' in event.data
  )
}

export function CalendlyEmbed() {
  const ref = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        loadCalendlyScript()
        setLoaded(true)
        track('calendly_open', { location: 'agenda' })
      },
      { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!isCalendlyEvent(event)) return
      const name = (event.data as { event: string }).event
      if (name === 'calendly.event_scheduled') {
        track('booking_confirmed', { value: 1 })
        navigate(ROUTES.thankYou)
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])

  return (
    <div
      ref={ref}
      className="calendly-inline-widget h-[720px] w-full overflow-hidden rounded-card bg-ink-900 ring-hair"
      data-url={loaded ? calendlyUrl() : undefined}
    >
      {!loaded && (
        <div className="flex h-full items-center justify-center text-slateq">
          {ui.calendly.loading}
        </div>
      )}
      <noscript>
        <p className="p-6 text-mist">
          {ui.calendly.noscript} {SITE.contact.phoneDisplay}.
        </p>
      </noscript>
    </div>
  )
}
