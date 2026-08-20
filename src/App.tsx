import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from '@/pages/Home'
import { CookieBanner } from '@/components/conversion/CookieBanner'
import { scrollToSection } from '@/lib/scroll'

const Agenda = lazy(() => import('@/pages/Agenda'))
const ServiceLanding = lazy(() => import('@/pages/ServiceLanding'))
const ThankYou = lazy(() => import('@/pages/ThankYou'))
const Privacy = lazy(() => import('@/pages/Privacy'))
const Terms = lazy(() => import('@/pages/Terms'))
const NotFound = lazy(() => import('@/pages/NotFound'))

/** Sube al inicio al cambiar de ruta y salta al #ancla cuando la hay. */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // La sección puede llegar con el chunk diferido: reintenta un frame después.
      if (scrollToSection(id, false)) return
      const frame = requestAnimationFrame(() => scrollToSection(id, false))
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollManager />
      <Suspense fallback={<div className="min-h-screen bg-ink-950" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/servicios/:slug" element={<ServiceLanding />} />
          <Route path="/gracias" element={<ThankYou />} />
          <Route path="/privacidad" element={<Privacy />} />
          <Route path="/terminos" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <CookieBanner />
    </BrowserRouter>
  )
}
