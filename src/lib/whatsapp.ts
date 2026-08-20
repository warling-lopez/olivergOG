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
