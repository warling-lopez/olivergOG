import { Target, TrendingUp, Handshake } from 'lucide-react'
import type { Pillar, SectionIntro } from '@/types'

export const pillarsIntro: SectionIntro = {
  eyebrow: 'FILOSOFÍA',
  lines: [
    { text: 'TRES PRINCIPIOS', tone: 'light' },
    { text: 'QUE GUÍAN TODO', tone: 'brand' },
  ],
  subtitle: 'Visión, estrategia e impacto. En ese orden, y sin saltarse ninguno.',
}

export const pillars: Pillar[] = [
  {
    id: 'vision',
    title: 'Visión',
    description: 'Construir un futuro con propósito y dirección.',
    icon: Target,
  },
  {
    id: 'estrategia',
    title: 'Estrategia',
    description:
      'Las decisiones correctas hoy crean resultados extraordinarios mañana.',
    icon: TrendingUp,
  },
  {
    id: 'impacto',
    title: 'Impacto',
    description: 'Más que un negocio, dejamos huella.',
    icon: Handshake,
  },
]
