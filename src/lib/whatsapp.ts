import { SITE } from '@/config/site'

const DEFAULT_MESSAGE =
  'Hola Oliver, vi tu página web y me gustaría agendar una conversación sobre mi negocio.'

/** Enlace de WhatsApp con el mensaje pre-escrito. Siempre con target _blank + noopener. */
export function whatsappLink(message: string = DEFAULT_MESSAGE): string {
  return `https://wa.me/${SITE.contact.whatsapp}?text=${encodeURIComponent(message)}`
}

export function telLink(): string {
  return `tel:${SITE.contact.phone}`
}

export interface ContactLead {
  nombre: string
  negocio: string
  resolver: string
}

/**
 * Arma el mensaje del formulario de contacto. No hay backend: el texto viaja
 * dentro del propio WhatsApp del visitante, así que nada se guarda en ningún
 * servidor y no hay correos esperando respuesta.
 *
 * encodeURIComponent convierte los saltos en %0A y preserva tildes, ñ y ¿ ¡.
 */
export function contactMessage(lead: ContactLead): string {
  return [
    'Nueva consulta desde la web',
    '',
    `Nombre: ${lead.nombre}`,
    `Negocio u oficio: ${lead.negocio}`,
    `Qué quiere resolver: ${lead.resolver}`,
    '',
    'Me gustaría agendar la conversación inicial de 30 minutos.',
  ].join('\n')
}

/** Abre el chat en una pestaña nueva. */
export function openWhatsApp(message: string): void {
  window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
}
