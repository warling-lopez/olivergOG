import { cn } from '@/lib/cn'
import type { HeadingLine } from '@/types'

/**
 * Ancla de coherencia del sistema: barra azul de 3 px → eyebrow mono →
 * titular bicolor (2ª línea siempre en azul) → hairline de 64 px.
 * Toda sección lo usa; sin él se rompe el ritmo.
 */
export function SectionHeading({
  eyebrow,
  lines,
  subtitle,
  align = 'left',
  as: Tag = 'h2',
  id,
  className,
}: {
  eyebrow: string
  lines: readonly HeadingLine[]
  subtitle?: string
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  id?: string
  className?: string
}) {
  const centered = align === 'center'

  return (
    <div
      className={cn(
        'relative flex flex-col gap-4',
        centered ? 'items-center text-center' : 'items-start pl-6 text-left',
        className,
      )}
    >
      {!centered && (
        <span
          aria-hidden="true"
          className="absolute left-0 top-1 h-[calc(100%-2.5rem)] w-[3px] rounded-full bg-brand-500"
        />
      )}

      <span className="eyebrow">{eyebrow}</span>

      <Tag id={id} className="display-lg max-w-4xl text-balance">
        {lines.map((line) => (
          <span
            key={line.text}
            className={cn('block', line.tone === 'brand' ? 'text-brand-500' : 'text-paper')}
          >
            {line.text}
          </span>
        ))}
      </Tag>

      <span aria-hidden="true" className="block h-px w-16 bg-mist/25" />

      {subtitle && <p className={cn('lead', centered && 'max-w-2xl')}>{subtitle}</p>}
    </div>
  )
}
