import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { methodIntro, methodSteps } from '@/content/method'

export function Method() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  /* La línea del timeline se dibuja ligada al progreso de scroll de la sección. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const pathLength = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section
      id="metodologia"
      aria-labelledby="metodologia-title"
      className="scroll-mt-24 border-y border-mist/10 bg-ink-900"
    >
      <div className="container-page section-y flex flex-col gap-14">
        <Reveal>
          <SectionHeading {...methodIntro} id="metodologia-title" />
        </Reveal>

        <div ref={ref} className="relative mx-auto w-full max-w-3xl">
          {/* Línea SVG con pathLength ligado al scroll */}
          <svg
            aria-hidden="true"
            className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-[2px] sm:block"
            preserveAspectRatio="none"
            viewBox="0 0 2 100"
          >
            <line x1="1" y1="0" x2="1" y2="100" stroke="currentColor" className="text-mist/12" strokeWidth="2" />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100"
              stroke="currentColor"
              className="text-brand-500"
              strokeWidth="2"
              style={reduced ? { pathLength: 1 } : { pathLength }}
            />
          </svg>

          <Reveal staggerChildren as="ol" className="flex flex-col gap-12">
            {methodSteps.map((step) => (
              <RevealItem key={step.step} as="li" className="relative flex gap-6">
                <span className="num z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-ink-950 text-xl font-extrabold text-brand-500 ring-1 ring-brand-500/30">
                  {step.step}
                </span>
                <div className="flex flex-col gap-2 pt-3">
                  <h3 className="display-md text-paper">{step.title}</h3>
                  <p className="body-copy">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
