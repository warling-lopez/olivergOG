import type { SectionIntro } from '@/types'

export const valuePropIntro: SectionIntro = {
  eyebrow: '¿TE SUENA?',
  lines: [
    { text: 'TRABAJAS MÁS QUE NUNCA', tone: 'light' },
    { text: 'Y EL NEGOCIO NO AVANZA', tone: 'brand' },
  ],
}

export const valueProp = {
  pains: [
    {
      title: 'Facturas, pero no creces',
      description:
        'Entra dinero todos los meses y aun así la utilidad no aparece por ningún lado.',
    },
    {
      title: 'Decides por instinto, no por datos',
      description:
        'Cada decisión importante se toma a corazonada porque los números no están claros.',
    },
    {
      title: 'El negocio depende 100 % de ti',
      description:
        'Si te ausentas una semana, todo se detiene. Tienes un empleo, no una empresa.',
    },
  ],
  transition: {
    light: 'No necesitas más esfuerzo.',
    brand: 'Necesitas dirección.',
  },
  marquee: ['VISIÓN', 'ESTRATEGIA', 'IMPACTO', 'CRECIMIENTO'],
} as const
