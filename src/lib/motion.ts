import type { Variants } from 'framer-motion'

/** easeOutExpo suave. Nada rebota: el movimiento comunica jerarquía. */
export const EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
}

export const stagger = (delay = 0.09): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.1 } },
})

/** Las dos líneas del H1 se revelan de abajo hacia arriba con clip-path. */
export const heroLine: Variants = {
  hidden: { clipPath: 'inset(100% 0% 0% 0%)', y: 12 },
  visible: (index: number) => ({
    clipPath: 'inset(0% 0% 0% 0%)',
    y: 0,
    transition: { duration: 0.8, delay: index * 0.12, ease: EASE },
  }),
}

export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: EASE } },
}

export const VIEWPORT = { once: true, amount: 0.25 } as const
