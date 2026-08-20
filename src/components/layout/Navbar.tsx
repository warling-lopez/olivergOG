import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Logo } from './Logo'
import { SectionLink } from './SectionLink'
import { ButtonRoute } from '@/components/ui/Button'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { track } from '@/lib/analytics'
import { EASE } from '@/lib/motion'
import { CTA_LABEL, ROUTES, SECTIONS } from '@/config/site'
import { ui } from '@/content/ui'
import { cn } from '@/lib/cn'

const SECTION_IDS = SECTIONS.map((section) => section.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(
    () => typeof window !== 'undefined' && window.scrollY > 80,
  )
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const active = useActiveSection(SECTION_IDS)
  const reduced = useReducedMotion()
  const isHome = pathname === ROUTES.home

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* El menú a pantalla completa bloquea el scroll de fondo mientras está abierto. */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out',
        scrolled && !open && 'border-b border-mist/10 bg-ink-950/80 backdrop-blur-xl',
      )}
    >
      <nav
        aria-label={ui.a11y.mainNav}
        className={cn(
          'container-page flex items-center justify-between gap-6 transition-all duration-300 ease-out',
          scrolled ? 'h-[68px]' : 'h-[88px]',
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-7 lg:flex">
          {SECTIONS.map((section) => {
            const isActive = isHome && active === section.id
            return (
              <li key={section.id} className="relative">
                <SectionLink
                  id={section.id}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'text-sm transition-colors duration-200',
                    isActive ? 'text-paper' : 'text-mist hover:text-paper',
                  )}
                >
                  {section.label}
                </SectionLink>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand-500"
                  />
                )}
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ButtonRoute
            to={ROUTES.agenda}
            size="sm"
            className="hidden sm:inline-flex"
            onClick={() => track('cta_click', { location: 'navbar', label: CTA_LABEL })}
          >
            {CTA_LABEL}
          </ButtonRoute>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? ui.a11y.closeMenu : ui.a11y.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-btn ring-1 ring-mist/25 text-paper transition-colors hover:ring-brand-500 lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" strokeWidth={1.75} className="size-5" />
            ) : (
              <Menu aria-hidden="true" strokeWidth={1.75} className="size-5" />
            )}
          </button>
        </div>
      </nav>

      {/* Menú móvil a pantalla completa: links en display-md escalonados */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-ink-950 pt-[88px] lg:hidden"
          >
            <ul className="container-page flex flex-1 flex-col justify-center gap-1 overflow-y-auto py-8">
              {SECTIONS.map((section, index) => (
                <motion.li
                  key={section.id}
                  initial={reduced ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.04, ease: EASE }}
                >
                  <SectionLink
                    id={section.id}
                    onNavigate={() => setOpen(false)}
                    className="block py-2 display-md text-mist transition-colors hover:text-paper"
                  >
                    {section.label}
                  </SectionLink>
                </motion.li>
              ))}
            </ul>
            <div className="container-page pb-10">
              <ButtonRoute
                to={ROUTES.agenda}
                size="lg"
                className="w-full"
                onClick={() => {
                  setOpen(false)
                  track('cta_click', { location: 'navbar_mobile', label: CTA_LABEL })
                }}
              >
                {CTA_LABEL}
              </ButtonRoute>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
