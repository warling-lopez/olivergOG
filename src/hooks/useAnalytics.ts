import { useCallback, useEffect, useRef } from 'react'
import { track, type AnalyticsEvent } from '@/lib/analytics'

const DEPTHS = [25, 50, 75, 100] as const

/** Reporta scroll_depth en 25/50/75/100 % una sola vez por carga. */
export function useScrollDepth(): void {
  const reported = useRef<Set<number>>(new Set())

  useEffect(() => {
    const onScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      const percent = (window.scrollY / scrollable) * 100

      for (const depth of DEPTHS) {
        if (percent >= depth && !reported.current.has(depth)) {
          reported.current.add(depth)
          track('scroll_depth', { percent: depth })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
}

export function useTrack() {
  return useCallback(
    (event: AnalyticsEvent, params?: Record<string, unknown>) => track(event, params),
    [],
  )
}
