import type { ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { buttonClass, type ButtonSize, type ButtonVariant } from './buttonStyles'

interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type NativeButton = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'>
type NativeAnchor = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'>

export function Button({ variant, size, className, children, ...rest }: StyleProps & NativeButton) {
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </button>
  )
}

/** Enlace externo (WhatsApp, tel:, redes) con el mismo estilo del botón. */
export function ButtonLink({ variant, size, className, children, ...rest }: StyleProps & NativeAnchor) {
  return (
    <a className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </a>
  )
}

/** Navegación interna del router con el mismo estilo del botón. */
export function ButtonRoute({
  variant,
  size,
  className,
  children,
  ...rest
}: StyleProps & Omit<LinkProps, 'className' | 'children'>) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...rest}>
      {children}
    </Link>
  )
}
