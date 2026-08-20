import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { contactMessage, openWhatsApp } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'
import { ROUTES } from '@/config/site'
import { contactForm } from '@/content/cta'

const inputClass =
  'min-h-11 rounded-btn bg-ink-800/60 px-4 py-3 text-paper ring-1 ring-mist/20 transition-shadow placeholder:text-slateq focus:ring-brand-500'

/**
 * Tres campos, sin backend: al enviar se construye el mensaje de WhatsApp y se
 * abre el chat. Cero espera, cero correos que nadie contesta.
 */
export function ContactForm({ location }: { location: string }) {
  const navigate = useNavigate()
  const started = useRef(false)
  const [sent, setSent] = useState(false)

  const onFirstFocus = () => {
    if (started.current) return
    started.current = true
    track('form_step', { step: 1, form: 'contacto' })
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const message = contactMessage({
      nombre: String(data.get('nombre') ?? ''),
      negocio: String(data.get('negocio') ?? ''),
      resolver: String(data.get('resolver') ?? ''),
    })

    track('lead_form_submit', { location })
    // La conversión: el formulario se completó y abrió WhatsApp.
    track('whatsapp_send', { location, value: 1 })

    openWhatsApp(message)
    setSent(true)
    navigate(ROUTES.thankYou)
  }

  return (
    <form onSubmit={onSubmit} onFocusCapture={onFirstFocus} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2 text-sm text-mist">
        {contactForm.fields.nombre.label}
        <input
          required
          name="nombre"
          type="text"
          autoComplete="name"
          placeholder={contactForm.fields.nombre.placeholder}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-mist">
        {contactForm.fields.negocio.label}
        <input
          required
          name="negocio"
          type="text"
          autoComplete="organization"
          placeholder={contactForm.fields.negocio.placeholder}
          className={inputClass}
        />
      </label>

      <label className="flex flex-col gap-2 text-sm text-mist">
        {contactForm.fields.resolver.label}
        <textarea
          required
          name="resolver"
          rows={4}
          placeholder={contactForm.fields.resolver.placeholder}
          className={inputClass}
        />
      </label>

      <Button type="submit" size="lg" className="self-start">
        {contactForm.submit}
      </Button>

      {/* Avisar del salto a WhatsApp sube la tasa de envío. */}
      <p className="caption">{contactForm.note}</p>

      <p role="status" aria-live="polite" className="min-h-5 text-sm text-brand-400">
        {sent ? contactForm.sent : ''}
      </p>
    </form>
  )
}
