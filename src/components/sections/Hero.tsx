import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CtaBlock } from '@/components/conversion/CtaBlock'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { heroLine, EASE } from '@/lib/motion'
import { asset } from '@/config/site'
import { hero } from '@/content/hero'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  /* Parallax vertical suave del retrato: 0 → -40px a lo largo de la sección. */
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -40])

  const lines = [
    { text: hero.titleLine1, className: 'text-paper' },
    { text: hero.titleLine2, className: 'text-brand-500' },
  ]

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[88px]"
    >
      {/* Fondo: navy + glow radial que respira + grid de puntos. Una textura por plano. */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink-950">
        <div className="absolute left-1/2 top-[38%] size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-[130px] motion-safe:animate-glow-breathe" />
        <div className="absolute inset-0 bg-dotgrid opacity-60" />
        <div className="absolute inset-0 bg-noise" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink-950" />
      </div>

      {/* Retrato: recorte sobre el navy, fundido en la base. En móvil pasa detrás del texto. */}
      <motion.div
        aria-hidden="true"
        style={reduced ? undefined : { y: portraitY }}
        className="pointer-events-none absolute inset-y-0 right-0 flex w-full items-end justify-end md:w-[46%]"
      >
        <div className="relative h-[72%] w-full md:h-[92%]">
          <img
            src={asset(hero.portrait)}
            alt=""
            width={600}
            height={900}
            loading="eager"
            fetchPriority="high"
            className="h-full w-full object-contain object-bottom opacity-25 [filter:drop-shadow(-12px_0_36px_rgba(30,107,255,0.35))] md:opacity-100"
          />
          {/* Desvanecido de la base hacia ink-950: sin corte duro */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-ink-950" />
        </div>
      </motion.div>

      <div className="container-page relative grid gap-10 md:grid-cols-12">
        <div className="flex flex-col gap-7 md:col-span-7">
          <span className="eyebrow">{hero.eyebrow}</span>

          <h1 id="hero-title" className="display-xl">
            {lines.map((line, index) =>
              reduced ? (
                <span key={line.text} className={`block ${line.className}`}>
                  {line.text}
                </span>
              ) : (
                <motion.span
                  key={line.text}
                  custom={index}
                  variants={heroLine}
                  initial="hidden"
                  animate="visible"
                  className={`block ${line.className}`}
                >
                  {line.text}
                </motion.span>
              ),
            )}
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
            className="flex flex-col gap-6"
          >
            <p className="lead max-w-xl">{hero.subtitle}</p>
            <p className="body-copy">{hero.value}</p>

            <CtaBlock location="hero" message={hero.whatsappMessage} />

            <p className="caption">{hero.socialProof}</p>
          </motion.div>
        </div>
      </div>

      <a
        href="#propuesta"
        aria-label={hero.scrollHint}
        className="absolute inset-x-0 bottom-8 mx-auto flex w-fit flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.28em] text-slateq transition-colors hover:text-paper"
      >
        {hero.scrollHint}
        <ChevronDown aria-hidden="true" strokeWidth={1.75} className="size-4 motion-safe:animate-bounce" />
      </a>
    </section>
  )
}
