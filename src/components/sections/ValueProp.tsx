import { AlertCircle } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Marquee } from '@/components/ui/Marquee'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { valueProp, valuePropIntro } from '@/content/valueProp'

export function ValueProp() {
  return (
    <section id="propuesta" aria-labelledby="propuesta-title" className="scroll-mt-24">
      <div className="container-page section-y flex flex-col gap-14">
        <Reveal>
          <SectionHeading {...valuePropIntro} id="propuesta-title" />
        </Reveal>

        <Reveal staggerChildren as="ul" className="grid gap-6 md:grid-cols-3">
          {valueProp.pains.map((pain) => (
            <RevealItem
              key={pain.title}
              as="li"
              className="flex flex-col gap-4 rounded-card bg-ink-800/60 p-7 ring-hair"
            >
              <AlertCircle aria-hidden="true" strokeWidth={1.75} className="size-6 text-brand-500" />
              <h3 className="display-md text-paper">{pain.title}</h3>
              <p className="body-copy">{pain.description}</p>
            </RevealItem>
          ))}
        </Reveal>

        <Reveal>
          <p className="display-lg text-paper">
            {valueProp.transition.light}{' '}
            <span className="text-brand-500">{valueProp.transition.brand}</span>
          </p>
        </Reveal>
      </div>

      <Marquee items={valueProp.marquee} />
    </section>
  )
}
