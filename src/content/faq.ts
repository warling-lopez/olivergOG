import type { FaqItem, SectionIntro } from '@/types'

export const faqIntro: SectionIntro = {
  eyebrow: 'PREGUNTAS FRECUENTES',
  lines: [
    { text: 'LO QUE TODOS', tone: 'light' },
    { text: 'PREGUNTAN ANTES', tone: 'brand' },
  ],
}

export const faq: FaqItem[] = [
  {
    question: '¿Cuánto cuesta una consultoría?',
    answer: 'TODO_CLIENTE: rango de inversión y de qué depende (alcance, duración, tamaño del negocio).',
  },
  {
    question: '¿Trabajas con negocios pequeños?',
    answer: 'TODO_CLIENTE: tamaño mínimo de negocio con el que trabaja y por qué.',
  },
  {
    question: '¿Es presencial o virtual?',
    answer: 'TODO_CLIENTE: modalidad de las sesiones y cobertura geográfica.',
  },
  {
    question: '¿Cuánto dura un proceso?',
    answer: 'TODO_CLIENTE: duración típica por tipo de servicio.',
  },
  {
    question: '¿Qué pasa en la primera reunión?',
    answer:
      'Son 30 minutos de conversación, sin costo y sin compromiso. Me cuentas cómo está tu negocio y qué te preocupa; salimos con claridad sobre si tiene sentido trabajar juntos.',
  },
  {
    question: '¿Trabajas fuera de Santiago?',
    answer: 'TODO_CLIENTE: ciudades y modalidad remota.',
  },
]
