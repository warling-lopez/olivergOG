import { lazy, Suspense } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import { JsonLd } from '@/components/seo/JsonLd'
import { Hero } from '@/components/sections/Hero'
import { ValueProp } from '@/components/sections/ValueProp'
import { Pillars } from '@/components/sections/Pillars'
import { faqSchema } from '@/config/schema'
import { hero } from '@/content/hero'

/* Todo lo que vive bajo el pliegue entra en su propio chunk. */
const About = lazy(() => import('@/components/sections/About').then((m) => ({ default: m.About })))
const Services = lazy(() =>
  import('@/components/sections/Services').then((m) => ({ default: m.Services })),
)
const Method = lazy(() =>
  import('@/components/sections/Method').then((m) => ({ default: m.Method })),
)
const Results = lazy(() =>
  import('@/components/sections/Results').then((m) => ({ default: m.Results })),
)
const Content = lazy(() =>
  import('@/components/sections/Content').then((m) => ({ default: m.Content })),
)
const Faq = lazy(() => import('@/components/sections/Faq').then((m) => ({ default: m.Faq })))
const FinalCta = lazy(() =>
  import('@/components/sections/FinalCta').then((m) => ({ default: m.FinalCta })),
)

/** Reserva altura para que la carga diferida no genere CLS. */
function SectionFallback() {
  return <div aria-hidden="true" className="min-h-[60vh]" />
}

export default function Home() {
  return (
    <PageShell path="/" whatsappMessage={hero.whatsappMessage}>
      <JsonLd id="ld-faq" data={faqSchema} />

      <Hero />
      <ValueProp />
      <Pillars />

      <Suspense fallback={<SectionFallback />}>
        <About />
        <Services />
        <Method />
        <Results />
        <Content />
        <Faq />
        <FinalCta />
      </Suspense>
    </PageShell>
  )
}
