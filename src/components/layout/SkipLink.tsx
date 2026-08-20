import { ui } from '@/content/ui'

export function SkipLink() {
  return (
    <a
      href="#contenido-principal"
      className="sr-only focus:not-sr-only focus:fixed focus:left-5 focus:top-5 focus:z-70 focus:rounded-btn focus:bg-brand-500 focus:px-6 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
    >
      {ui.a11y.skipToContent}
    </a>
  )
}
