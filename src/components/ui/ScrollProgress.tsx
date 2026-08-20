import { useScrollProgress } from '@/hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-60 h-0.5">
      <div
        className="h-full origin-left bg-brand-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}
