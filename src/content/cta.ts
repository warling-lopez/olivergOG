import type { SectionIntro } from '@/types'

export const finalCtaIntro: SectionIntro = {
  eyebrow: 'AGENDA',
  lines: [
    { text: '¿HABLAMOS?', tone: 'light' },
    { text: 'AGENDA TU CITA', tone: 'brand' },
  ],
}

export const finalCta = {
  subtitle:
    'Una conversación honesta sobre tu negocio, sin guion de ventas y sin compromiso.',
  riskReversal: '30 minutos. Sin costo. Sin compromiso.',
  whatsappMessage:
    'Hola Oliver, quiero agendar los 30 minutos de conversación inicial.',
} as const

export const agendaPage = {
  title: 'Agenda tu cita',
  subtitle:
    'Cuéntame en tres líneas dónde estás y te escribo por WhatsApp para coordinar la hora.',
  bullets: [
    'Conversamos 30 minutos sobre el momento actual de tu negocio.',
    'Identificamos juntos el cuello de botella más urgente.',
    'Sales con al menos una acción concreta, trabajemos o no juntos.',
  ],
  altHeadline: '¿Prefieres escribir directo?',
  altBody: 'Sáltate el formulario y escríbeme por WhatsApp ahora mismo.',
  altCta: 'Prefiero escribir directo',
  whatsappMessage: 'Hola Oliver, quiero agendar la conversación inicial de 30 minutos.',
  back: 'Volver al inicio',
} as const

export const contactForm = {
  submit: 'Enviar por WhatsApp',
  /* Decirlo sube la tasa de envío: nadie se sorprende con el cambio de app. */
  note: 'Se abrirá WhatsApp con tu mensaje ya escrito. Solo tienes que darle enviar.',
  errors: {
    required: 'Completa este campo para continuar.',
    tooShort: 'Cuéntame un poco más para poder ayudarte.',
  },
  fields: {
    nombre: { label: 'Nombre', placeholder: 'Tu nombre' },
    negocio: { label: 'Negocio u oficio', placeholder: 'Restaurante, constructora, consultorio…' },
    resolver: {
      label: '¿Qué quieres resolver?',
      placeholder: 'En qué está atascado el negocio ahora mismo',
    },
  },
} as const

export const thankYou = {
  title: 'Ya casi',
  subtitle:
    'Se abrió WhatsApp con tu mensaje listo. Dale enviar y coordinamos la hora en el mismo chat.',
  next: [
    'Dale enviar al mensaje que se abrió en WhatsApp.',
    'Anota las tres cosas que más te preocupan del negocio.',
    'Ten a mano tus números de los últimos tres meses, si los tienes.',
  ],
  cta: 'Abrir WhatsApp otra vez',
  back: 'Volver al inicio',
} as const

export const notFound = {
  title: 'Esta página no existe',
  subtitle: 'El enlace que seguiste no lleva a ningún lado, pero la conversación sí.',
  back: 'Volver al inicio',
} as const
