import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { getConsent, loadAnalytics, setConsent } from '@/lib/analytics'
import { SITE, ROUTES } from '@/config/site'
import { ui } from '@/content/ui'

/**
 * Banner mínimo de cookies. Solo aparece si hay un ID de GA4 configurado
 * y el usuario aún no ha decidido. Rechazar impide la carga de GA4.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(
    () => Boolean(SITE.analytics.ga4) && getConsent() === null,
  )

  useEffect(() => {
    if (SITE.analytics.ga4 && getConsent() === 'granted') loadAnalytics()
  }, [])

  if (!visible) return null

  const decide = (value: 'granted' | 'denied') => {
    setConsent(value)
    setVisible(false)
  }

  return (
    <div
      role="dialog"
      aria-label={ui.cookies.ariaLabel}
      className="fixed inset-x-4 bottom-4 z-70 mx-auto max-w-3xl rounded-card bg-ink-800 p-6 ring-hair md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
    >
      <p className="text-sm text-mist">
        {ui.cookies.text}{' '}
        <Link to={ROUTES.privacy} className="text-brand-400 underline underline-offset-2">
          {ui.footer.privacy}
        </Link>
        .
      </p>
      <div className="mt-5 flex gap-3">
        <Button size="sm" onClick={() => decide('granted')}>
          {ui.cookies.accept}
        </Button>
        <Button variant="secondary" size="sm" onClick={() => decide('denied')}>
          {ui.cookies.reject}
        </Button>
      </div>
    </div>
  )
}
