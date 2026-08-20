import { Phone } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { CtaBlock } from '@/components/conversion/CtaBlock'
import { Reveal } from '@/components/ui/Reveal'
import { finalCta, finalCtaIntro } from '@/content/cta'
import { SITE } from '@/config/site'
import { telLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

export function FinalCta() {
  return (
    <section
      id="agenda"
      aria-labelledby="agenda-title"
      className="relative scroll-mt-24 overflow-hidden bg-ink-900"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-radial-brand" />

      <Reveal className="container-page section-y flex flex-col items-center gap-8 text-center">
        <SectionHeading {...finalCtaIntro} id="agenda-title" align="center" />

        <p className="lead max-w-2xl">{finalCta.subtitle}</p>

        <CtaBlock location="final_cta" message={finalCta.whatsappMessage} align="center" />

        <a
          href={telLink()}
          onClick={() => track('phone_click', { location: 'final_cta' })}
          className="inline-flex items-center gap-2 text-mist transition-colors hover:text-paper"
        >
          <Phone aria-hidden="true" strokeWidth={1.75} className="size-4" />
          {SITE.contact.phoneDisplay}
        </a>

        <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand-400">
          {finalCta.riskReversal}
        </p>
      </Reveal>
    </section>
  )
}
