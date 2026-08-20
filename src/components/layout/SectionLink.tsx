import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ROUTES } from '@/config/site'
import { scrollToSection } from '@/lib/scroll'

/**
 * Enlace a una sección del one-page. En la home hace scroll suave con offset
 * de navbar; desde otra ruta navega a `/#seccion` y ScrollManager remata el salto.
 */
export function SectionLink({
  id,
  children,
  className,
  onNavigate,
  ...rest
}: {
  id: string
  children: ReactNode
  className?: string
  onNavigate?: () => void
  'aria-current'?: 'true'
}) {
  const { pathname } = useLocation()
  const isHome = pathname === ROUTES.home

  return (
    <Link
      to={isHome ? `#${id}` : `/#${id}`}
      className={className}
      onClick={(event) => {
        onNavigate?.()
        if (!isHome) return
        // En la home evitamos el salto nativo y controlamos el offset.
        if (scrollToSection(id)) {
          event.preventDefault()
          history.replaceState(null, '', `#${id}`)
        }
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}
