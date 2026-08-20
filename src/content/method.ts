import type { MethodStep, SectionIntro } from '@/types'

export const methodIntro: SectionIntro = {
  eyebrow: 'CÓMO TRABAJAMOS',
  lines: [
    { text: 'QUÉ PASA DESPUÉS', tone: 'light' },
    { text: 'DE QUE AGENDAS', tone: 'brand' },
  ],
  subtitle: 'Un proceso claro, sin sorpresas y sin letra pequeña.',
}

export const methodSteps: MethodStep[] = [
  {
    step: 1,
    title: 'Conversación inicial',
    description: '30 minutos, sin costo y sin compromiso. Me cuentas dónde estás y qué te preocupa.',
  },
  {
    step: 2,
    title: 'Diagnóstico',
    description: 'Analizamos números, procesos y equipo para ver el negocio como realmente está.',
  },
  {
    step: 3,
    title: 'Plan de acción',
    description: 'Prioridades claras, con responsables y fechas. Nada de documentos que nadie usa.',
  },
  {
    step: 4,
    title: 'Acompañamiento',
    description: 'Ejecutamos y medimos juntos. Ajustamos el rumbo con datos en la mano.',
  },
]
