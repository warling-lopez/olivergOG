import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, VIEWPORT } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Tag = 'div' | 'section' | 'ul' | 'ol' | 'li'

/**
 * Entrada al viewport, una sola vez. Con prefers-reduced-motion
 * renderiza el contenido estático, sin desplazamiento.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  staggerChildren = false,
  as = 'div',
  ...rest
}: {
  children: ReactNode
  className?: string
  delay?: number
  staggerChildren?: boolean
  as?: Tag
  'aria-labelledby'?: string
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Plain = as
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    )
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={staggerChildren ? stagger() : fadeUp}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

/** Hijo de un Reveal con staggerChildren. */
export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li'
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <MotionTag className={className} variants={fadeUp}>
      {children}
    </MotionTag>
  )
}
