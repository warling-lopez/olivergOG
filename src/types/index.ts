import type { LucideIcon } from 'lucide-react'

/** Titular bicolor: dos líneas máximo, la segunda siempre en azul. */
export interface HeadingLine {
  text: string
  tone: 'light' | 'brand'
}

export interface SectionIntro {
  eyebrow: string
  lines: [HeadingLine, HeadingLine] | [HeadingLine]
  subtitle?: string
}

export interface Pillar {
  id: string
  title: string
  description: string
  icon: LucideIcon
}

export interface ServiceFaq {
  question: string
  answer: string
}

export interface Service {
  slug: string
  name: string
  tagline: string
  /** Para quién es este servicio. */
  audience: string
  format: string
  featured: boolean
  badge?: string
  /** Bloques de la landing de venta. */
  hero: { promise: string; intro: string }
  problems: string[]
  deliverables: string[]
  steps: { title: string; description: string }[]
  investment: { headline: string; includes: string[] }
  faq: ServiceFaq[]
}

export interface MethodStep {
  step: number
  title: string
  description: string
}

export interface Metric {
  value: number
  suffix?: string
  label: string
}

export interface Testimonial {
  name: string
  company: string
  role: string
  quote: string
  photo?: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface ContentPost {
  title: string
  excerpt: string
  url: string
  tag: string
}
