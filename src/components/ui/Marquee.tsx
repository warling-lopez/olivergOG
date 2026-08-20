import { cn } from '@/lib/cn'

/** Cinta infinita de 40 s. Se detiene con prefers-reduced-motion (index.css). */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const track = [...items, ...items]

  return (
    <div
      aria-hidden="true"
      className={cn('relative flex overflow-hidden border-y border-mist/10 py-5', className)}
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 font-mono text-sm uppercase tracking-[0.3em] text-mist/50"
          >
            {item}
            <span className="text-brand-500">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
