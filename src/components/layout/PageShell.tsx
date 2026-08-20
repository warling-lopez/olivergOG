import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { SkipLink } from './SkipLink'
import { Seo } from '@/components/seo/Seo'
import { JsonLd } from '@/components/seo/JsonLd'
import { siteGraph } from '@/config/schema'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { StickyCta } from '@/components/conversion/StickyCta'
import { WhatsAppFab } from '@/components/conversion/WhatsAppFab'
import { getSeo } from '@/config/seo'
import { pageTransition } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollDepth } from '@/hooks/useAnalytics'

/**
 * Envuelve cada página: SEO, cromo del sitio y transición de entrada.
 * `chrome="minimal"` deja solo el logo (landings de venta) y `"bare"`
 * quita también los CTAs flotantes (/agenda, /gracias, 404).
 */
export function PageShell({
  path,
  children,
  chrome = 'full',
  whatsappMessage,
}: {
  path: string
  children: ReactNode
  chrome?: 'full' | 'minimal' | 'bare'
  whatsappMessage?: string
}) {
  const seo = getSeo(path)
  const reduced = useReducedMotion()
  const { key } = useLocation()

  useScrollDepth()

  return (
    <>
      <Seo {...seo} />
      <JsonLd id="ld-site" data={siteGraph} />
      <SkipLink />
      {chrome === 'full' && <ScrollProgress />}
      {chrome === 'full' && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.main
          key={key}
          id="contenido-principal"
          initial={reduced ? false : 'hidden'}
          animate="visible"
          exit="exit"
          variants={pageTransition}
          className="min-h-screen"
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {chrome === 'full' && <Footer />}
      {chrome !== 'bare' && <StickyCta message={whatsappMessage} />}
      {chrome !== 'bare' && <WhatsAppFab message={whatsappMessage} />}
    </>
  )
}
