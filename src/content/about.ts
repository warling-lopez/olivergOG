/**
 * Sección de mayor peso para confianza y E-E-A-T.
 * NO inventar credenciales ni cifras: todo dato pendiente va como TODO_CLIENTE.
 */
import type { SectionIntro } from '@/types'

export const aboutIntro: SectionIntro = {
  eyebrow: 'SOBRE OLIVER',
  lines: [
    { text: 'OLIVER G.', tone: 'light' },
    { text: 'CONSULTOR DE NEGOCIOS', tone: 'brand' },
  ],
}

export const about = {
  name: 'Oliver G.',
  role: 'Consultor de negocios y estratega empresarial',
  /** TODO_CLIENTE: sustituir por la foto real (.webp). */
  photo: '/img/oliver-about.svg',
  photoAlt: 'Retrato de Oliver G., consultor de negocios en Santiago, RD',
  bio: [
    'TODO_CLIENTE: párrafo 1 — trayectoria. Años en consultoría, cómo empezó, qué tipo de empresas ha acompañado.',
    'TODO_CLIENTE: párrafo 2 — filosofía de trabajo. Cómo aborda un negocio, qué lo diferencia, en qué cree.',
  ],
  credentials: [
    { label: 'Años de experiencia', value: 'TODO_CLIENTE' },
    { label: 'Formación', value: 'TODO_CLIENTE' },
    { label: 'Certificaciones', value: 'TODO_CLIENTE' },
    { label: 'Sectores atendidos', value: 'TODO_CLIENTE' },
  ],
  /** Si no hay logos de clientes, se muestran los sectores. */
  sectors: [
    'Retail',
    'Restaurantes',
    'Servicios profesionales',
    'Construcción',
  ],
} as const
