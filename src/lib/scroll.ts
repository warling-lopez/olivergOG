import { NAVBAR_OFFSET } from '@/config/site'

/** Salta a una sección compensando la altura de la navbar fija. */
export function scrollToSection(id: string, smooth = true): boolean {
  const el = document.getElementById(id)
  if (!el) return false

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET
  window.scrollTo({ top, behavior: smooth && !reduced ? 'smooth' : 'auto' })
  return true
}
