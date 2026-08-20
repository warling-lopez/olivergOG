import { SITE } from '@/config/site'
import { IS_DEV } from '@/config/env'

export type AnalyticsEvent =
  | 'cta_click'
  | 'whatsapp_click'
  /** Primer campo del formulario enfocado. */
  | 'form_start'
  /** El formulario armó el mensaje y abrió WhatsApp. ESTA es la conversión. */
  | 'whatsapp_send'
  | 'lead_form_submit'
  | 'phone_click'
  | 'service_view'
  | 'scroll_depth'
  | 'faq_open'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  window.dataLayer?.push({ event, ...params })
  window.gtag?.('event', event, params)
  if (IS_DEV) console.info('[track]', event, params)
}

/* ---------------------------------------------------------------
   Consentimiento
   El rechazo impide de verdad la carga de GA4; no es solo cosmético.
   --------------------------------------------------------------- */

const CONSENT_KEY = 'og_consent'
export type Consent = 'granted' | 'denied'

export function getConsent(): Consent | null {
  if (typeof localStorage === 'undefined') return null
  const value = localStorage.getItem(CONSENT_KEY)
  return value === 'granted' || value === 'denied' ? value : null
}

export function setConsent(consent: Consent): void {
  localStorage.setItem(CONSENT_KEY, consent)
  if (consent === 'granted') loadAnalytics()
}

let loaded = false

/** Inyecta GA4 con defer y solo después del evento `load`: nunca bloquea el render. */
export function loadAnalytics(): void {
  const id = SITE.analytics.ga4
  if (loaded || !id || typeof document === 'undefined') return
  loaded = true

  const inject = () => {
    const script = document.createElement('script')
    script.async = true
    script.defer = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)

    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
    window.gtag('js', new Date())
    window.gtag('config', id, { anonymize_ip: true })
  }

  if (document.readyState === 'complete') inject()
  else window.addEventListener('load', inject, { once: true })
}
