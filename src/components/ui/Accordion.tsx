import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { track } from '@/lib/analytics'
import { cn } from '@/lib/cn'

export interface AccordionItem {
  question: string
  answer: string
}

/** Un solo panel abierto a la vez. Operable con teclado y con aria-expanded correcto. */
export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <div className="border-t border-mist/12">
      {items.map((item, index) => {
        const isOpen = open === index
        return (
          <div key={item.question} className="border-b border-mist/12">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                id={`faq-trigger-${index}`}
                onClick={() => {
                  if (!isOpen) track('faq_open', { question: item.question })
                  setOpen(isOpen ? null : index)
                }}
                className="flex w-full items-center justify-between gap-6 py-6 text-left font-display text-lg font-bold text-paper transition-colors hover:text-brand-400"
              >
                {item.question}
                <Plus
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className={cn(
                    'size-5 shrink-0 text-brand-500 transition-transform duration-250 ease-out',
                    isOpen && 'rotate-45',
                  )}
                />
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="body-copy pb-6">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
