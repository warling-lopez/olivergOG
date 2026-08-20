import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const DURATION = 1400

/** Cuenta de 0 al valor al alcanzar el 50 % de visibilidad. Una sola vez. */
export function Counter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const [animated, setAnimated] = useState(0)
  const display = reduced || value === 0 ? value : animated

  useEffect(() => {
    if (reduced || value === 0) return
    const node = ref.current
    if (!node) return

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1)
          setAnimated(Math.round(value * (1 - Math.pow(1 - t, 3))))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.5 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [value, reduced])

  return (
    <span ref={ref} className="num text-brand-500">
      {display}
      {suffix && <span className="ml-0.5 text-[0.55em] text-mist">{suffix}</span>}
    </span>
  )
}
