import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { track } from '@/lib/analytics'
import { whatsappLink } from '@/lib/whatsapp'
import { SITE, ROUTES } from '@/config/site'
import { ui } from '@/content/ui'

const FIELDS = [
  { name: 'nombre', label: ui.form.fields.nombre, type: 'text', autoComplete: 'name' as const },
  { name: 'negocio', label: ui.form.fields.negocio, type: 'text', autoComplete: 'organization' as const },
  { name: 'telefono', label: ui.form.fields.telefono, type: 'tel', autoComplete: 'tel' as const, inputMode: 'tel' as const },
  { name: 'correo', label: ui.form.fields.correo, type: 'email', autoComplete: 'email' as const },
] as const

type Status = 'idle' | 'sending' | 'success' | 'error'

const inputClass =
  'min-h-11 rounded-btn bg-ink-800/60 px-4 py-3 text-paper ring-1 ring-mist/20 transition-shadow placeholder:text-slateq focus:ring-brand-500'

/**
 * Sin backend propio: envía a `VITE_FORM_ENDPOINT` (Formspree / Web3Forms).
 * Si no hay endpoint configurado, cae a WhatsApp con el mensaje ya armado,
 * de modo que el formulario nunca queda muerto.
 */
export function LeadForm({ location, service }: { location: string; service?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const navigate = useNavigate()

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    // Honeypot: si viene relleno es un bot. Fingimos éxito y no enviamos nada.
    if (data.get('empresa_web')) {
      setStatus('success')
      return
    }

    setStatus('sending')
    track('lead_form_submit', { location, service: service ?? 'general' })

    if (!SITE.formEndpoint) {
      const lines = [
        ui.form.intro,
        ...FIELDS.map((field) => `${field.label}: ${data.get(field.name)}`),
        `${ui.form.messageLabel} ${data.get('mensaje')}`,
      ]
      window.open(whatsappLink(lines.join('\n')), '_blank', 'noopener')
      setStatus('success')
      return
    }

    try {
      const response = await fetch(SITE.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      })
      if (!response.ok) throw new Error(String(response.status))
      setStatus('success')
      form.reset()
      navigate(ROUTES.thankYou)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <label key={field.name} className="flex flex-col gap-2 text-sm text-mist">
            {field.label}
            <input
              required
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              inputMode={'inputMode' in field ? field.inputMode : undefined}
              className={inputClass}
            />
          </label>
        ))}
      </div>

      <label className="flex flex-col gap-2 text-sm text-mist">
        {ui.form.messageLabel}
        <textarea required name="mensaje" rows={4} className={inputClass} />
      </label>

      {/* Honeypot: invisible para personas, irresistible para bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          {ui.form.honeypot}
          <input type="text" name="empresa_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Button type="submit" size="lg" disabled={status === 'sending'} className="self-start">
        {status === 'sending' ? ui.form.sending : ui.form.submit}
      </Button>

      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {status === 'success' && <span className="text-brand-400">{ui.form.success}</span>}
        {status === 'error' && <span className="text-gold-400">{ui.form.error}</span>}
      </p>
    </form>
  )
}
