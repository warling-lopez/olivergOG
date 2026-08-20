import { SectionHeading } from '@/components/ui/SectionHeading'
import { Accordion } from '@/components/ui/Accordion'
import { Reveal } from '@/components/ui/Reveal'
import { faq, faqIntro } from '@/content/faq'

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-24">
      <div className="container-page section-y mx-auto flex max-w-3xl flex-col gap-12">
        <Reveal>
          <SectionHeading {...faqIntro} id="faq-title" />
        </Reveal>
        <Reveal>
          <Accordion items={faq} />
        </Reveal>
      </div>
    </section>
  )
}
