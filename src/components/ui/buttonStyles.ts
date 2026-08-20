import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'
export type ButtonSize = 'sm' | 'md' | 'lg'

/** Altura mínima táctil 44 px + foco azul sobre el navy. */
const base =
  'group inline-flex min-h-11 items-center justify-center gap-2 font-semibold transition-all duration-200 ease-out ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ' +
  'disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<ButtonVariant, string> = {
  primary:
    'rounded-btn bg-brand-500 text-white hover:bg-brand-400 hover:glow-brand hover:-translate-y-0.5 active:bg-brand-600 active:translate-y-0',
  secondary:
    'rounded-btn ring-1 ring-mist/25 text-paper hover:ring-brand-500 hover:text-brand-400',
  ghost: 'rounded-btn text-paper hover:text-brand-400',
  whatsapp: 'rounded-btn bg-whatsapp text-ink-950 hover:brightness-110 hover:-translate-y-0.5',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-5 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
}

export function buttonClass({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}): string {
  return cn(base, variants[variant], sizes[size], className)
}
