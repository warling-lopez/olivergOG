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
  subtitle: 'Elige el día y la hora que mejor te convenga.',
  bullets: [
    'Conversamos 30 minutos sobre el momento actual de tu negocio.',
    'Identificamos juntos el cuello de botella más urgente.',
    'Sales con al menos una acción concreta, trabajemos o no juntos.',
  ],
  altHeadline: '¿Prefieres escribir?',
  formHeadline: '¿No encuentras un horario que te sirva?',
  formSubtitle:
    'Déjame tus datos y te escribo yo para coordinar una hora que te funcione.',
  whatsappMessage: 'Hola Oliver, prefiero coordinar la cita por WhatsApp.',
  back: 'Volver al inicio',
} as const

export const thankYou = {
  title: 'Cita confirmada',
  subtitle:
    'Recibirás la confirmación por correo con el enlace de la reunión. Nos vemos pronto.',
  next: [
    'Revisa tu correo — ahí va el enlace de la reunión.',
    'Anota las tres cosas que más te preocupan del negocio.',
    'Ten a mano tus números de los últimos tres meses, si los tienes.',
  ],
  back: 'Volver al inicio',
} as const

export const notFound = {
  title: 'Esta página no existe',
  subtitle: 'El enlace que seguiste no lleva a ningún lado, pero la conversación sí.',
  back: 'Volver al inicio',
} as const
