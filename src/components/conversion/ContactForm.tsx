import { useRef, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { contactMessage, openWhatsApp } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'
import { ROUTES } from '@/config/site'
import { contactForm } from '@/content/cta'
import { cn } from '@/lib/cn'

const FIELDS = [
  { name: 'nombre', autoComplete: 'name', multiline: false, min: 2 },
  { name: 'negocio', autoComplete: 'organization', multiline: false, min: 2 },
  { name: 'resolver', autoComplete: 'off', multiline: true, min: 10 },
] as const

type FieldName = (typeof FIELDS)[number]['name']
type Errors = Partial<Record<FieldName, string>>

const inputClass =
  'min-h-11 rounded-btn bg-ink-800/60 px-4 py-3 text-paper ring-1 transition-shadow placeholder:text-slateq focus:ring-brand-500'

/**
 * Tres campos y sin backend: al enviar se construye el mensaje de WhatsApp y se
 * abre el chat. Nada viaja a ningún servidor nuestro.
 *
 * Límite conocido: si la persona cierra WhatsApp sin pulsar enviar, ese lead se
 * pierde y no queda registro en ningún lado. Es el precio de no tener backend.
 */
export function ContactForm({ location, service }: { location: string; service?: string }) {
  const navigate = useNavigate()
  const started = useRef(false)
  const [errors, setErrors] = useState<Errors>({})

  const onFirstFocus = () => {
    if (started.current) return
    started.current = true
    track('form_start', { form: 'contacto' })
  }

  function validate(data: FormData): Errors {
    const found: Errors = {}
    for (const field of FIELDS) {
      const value = String(data.get(field.name) ?? '').trim()
      if (!value) found[field.name] = contactForm.errors.required
      else if (value.length < field.min) found[field.name] = contactForm.errors.tooShort
    }
    return found
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const found = validate(data)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      const first = FIELDS.find((f) => found[f.name])
      document.getElementById(`contact-${first?.name}`)?.focus()
      return
    }

    const message = contactMessage({
      nombre: String(data.get('nombre') ?? ''),
      negocio: String(data.get('negocio') ?? ''),
      resolver: String(data.get('resolver') ?? ''),
    })

    track('lead_form_submit', { service: service ?? 'general' })
    // La conversión: el formulario armó el mensaje y abrió WhatsApp.
    track('whatsapp_send', { value: 1, service: service ?? 'general', location })

    openWhatsApp(message)
    navigate(ROUTES.thankYou)
  }

  return (
    /* noValidate para que los mensajes sean los nuestros, en español, y no los
       del navegador, que salen en el idioma del sistema. */
    <form onSubmit={onSubmit} onFocusCapture={onFirstFocus} noValidate className="flex flex-col gap-5">
      {FIELDS.map((field) => {
        const copy = contactForm.fields[field.name]
        const error = errors[field.name]
        const id = `contact-${field.name}`
        const shared = {
          id,
          name: field.name,
          placeholder: copy.placeholder,
          autoComplete: field.autoComplete,
          'aria-invalid': error ? true : undefined,
          'aria-describedby': error ? `${id}-error` : undefined,
          className: cn(inputClass, error ? 'ring-gold-400' : 'ring-mist/20'),
        }

        return (
          <div key={field.name} className="flex flex-col gap-2">
            <label htmlFor={id} className="text-sm text-mist">
              {copy.label}
            </label>

            {field.multiline ? (
              <textarea {...shared} rows={4} />
            ) : (
              <input {...shared} type="text" />
            )}

            {error && (
              <p id={`${id}-error`} role="alert" className="text-sm text-gold-400">
                {error}
              </p>
            )}
          </div>
        )
      })}

      <Button type="submit" size="lg" className="self-start">
        {contactForm.submit}
      </Button>

      {/* Avisar del salto a WhatsApp sube la tasa de envío. */}
      <p className="caption">{contactForm.note}</p>
    </form>
  )
}
