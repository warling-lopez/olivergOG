import type { Metric, SectionIntro, Testimonial } from '@/types'

export const resultsIntro: SectionIntro = {
  eyebrow: 'RESULTADOS',
  lines: [
    { text: 'NEGOCIOS REALES', tone: 'light' },
    { text: 'NÚMEROS REALES', tone: 'brand' },
  ],
  subtitle: 'Lo que dicen quienes ya trabajaron con Oliver.',
}

export const resultsCopy = {
  emptyState:
    'Estamos recopilando los testimonios de los negocios acompañados este año. Mientras tanto, conversemos: la primera reunión no cuesta nada.',
}

/** TODO_CLIENTE: cifras reales. No publicar números sin confirmar con el cliente. */
export const metrics: Metric[] = [
  { value: 0, suffix: '+', label: 'Años de experiencia' },
  { value: 0, suffix: '+', label: 'Negocios asesorados' },
  { value: 0, suffix: '', label: 'Sectores atendidos' },
  { value: 0, suffix: '+', label: 'Horas de consultoría' },
]

/** TODO_CLIENTE: testimonios reales con autorización. Nunca fabricar. */
export const testimonials: Testimonial[] = []
