import { useEffect } from 'react'
import { Navigate, useParams, Link } from 'react-router-dom'
import { Check, ArrowLeft, Quote } from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { Logo } from '@/components/layout/Logo'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Accordion } from '@/components/ui/Accordion'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { GlowDivider } from '@/components/ui/GlowDivider'
import { CtaBlock } from '@/components/conversion/CtaBlock'
import { getService } from '@/content/services'
import { JsonLd } from '@/components/seo/JsonLd'
import { serviceGraph } from '@/config/schema'
import { getSeo } from '@/config/seo'
import { testimonials } from '@/content/results'
import { finalCta, finalCtaIntro } from '@/content/cta'
import { ROUTES } from '@/config/site'
import { track } from '@/lib/analytics'
import { ui, landing } from '@/content/ui'

/**
 * Una sola plantilla para las tres landings de venta.
 * Estructura: hero → problema → solución → proceso → prueba → inversión → objeciones → cierre.
 * El CTA se repite 4 veces y siempre con el mismo verbo.
 */
export default function ServiceLanding() {
  const { slug } = useParams<{ slug: string }>()
  const service = getService(slug)

  useEffect(() => {
    if (service) track('service_view', { slug: service.slug })
  }, [service])

  if (!service) return <Navigate to={ROUTES.home} replace />

  const message = `${landing.whatsappMessagePrefix} ${service.name}.`
  const proof = testimonials[0]

  return (
    <PageShell path={`/servicios/${service.slug}`} chrome="minimal" whatsappMessage={message}>
      <JsonLd
        id="ld-service"
        data={serviceGraph(service, getSeo(`/servicios/${service.slug}`).description)}
      />

      {/* Cabecera mínima: solo logo y salida al inicio */}
      <div className="container-page flex items-center justify-between py-6">
        <Logo />
        <Link
          to={ROUTES.home}
          className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-paper"
        >
          <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="size-4" />
          {ui.nav.home}
        </Link>
      </div>

      {/* 1. HERO */}
      <section className="relative overflow-hidden section-y">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 size-[34rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[110px]" />
        </div>
        <div className="container-page flex max-w-3xl flex-col gap-6">
          {service.badge && <Badge>{service.badge}</Badge>}
          <span className="eyebrow">{service.name.toUpperCase()}</span>
          <h1 className="display-lg text-paper">{service.hero.promise}</h1>
          <p className="lead">{service.hero.intro}</p>
          <p className="body-copy">
            <span className="font-semibold text-paper">{landing.audienceLabel} </span>
            {service.audience}
          </p>
          <CtaBlock location={`landing_${service.slug}_hero`} message={message} align="left" />
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-slateq">{service.format}</p>
        </div>
      </section>

      <GlowDivider />

      {/* 2. PROBLEMA */}
      <section aria-labelledby="landing-problemas" className="section-y">
        <div className="container-page flex flex-col gap-10">
          <Reveal>
            <SectionHeading {...landing.problems} id="landing-problemas" />
          </Reveal>
          <Reveal staggerChildren className="grid gap-6 md:grid-cols-3">
            {service.problems.map((problem) => (
              <RevealItem
                key={problem}
                className="rounded-card bg-ink-800/60 ring-hair p-6 text-mist"
              >
                {problem}
              </RevealItem>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 3. SOLUCIÓN */}
      <section aria-labelledby="landing-solucion" className="section-y border-y border-mist/10 bg-ink-900">
        <div className="container-page flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              id="landing-solucion"
              eyebrow={landing.solution.eyebrow}
              lines={[
                { text: landing.solution.firstLine, tone: 'light' },
                { text: service.name.toUpperCase(), tone: 'brand' },
              ]}
            />
          </Reveal>
          <Reveal staggerChildren as="ul" className="mx-auto grid max-w-3xl gap-4">
            {service.deliverables.map((item) => (
              <RevealItem
                key={item}
                as="li"
                className="flex gap-3 rounded-card bg-ink-800/60 p-5 text-paper ring-hair"
              >
                <Check aria-hidden="true" strokeWidth={1.75} className="mt-1 size-5 shrink-0 text-brand-500" />
                {item}
              </RevealItem>
            ))}
          </Reveal>
          <Reveal>
            <CtaBlock location={`landing_${service.slug}_solucion`} message={message} />
          </Reveal>
        </div>
      </section>

      {/* 4. PROCESO */}
      <section aria-labelledby="landing-proceso" className="section-y">
        <div className="container-page flex flex-col gap-10">
          <Reveal>
            <SectionHeading {...landing.process} id="landing-proceso" />
          </Reveal>
          <Reveal staggerChildren as="ol" className="mx-auto flex max-w-3xl flex-col gap-8">
            {service.steps.map((step, index) => (
              <RevealItem key={step.title} as="li" className="flex gap-6">
                <span className="num inline-flex size-14 shrink-0 items-center justify-center rounded-full bg-ink-950 text-xl font-extrabold text-brand-500 ring-1 ring-brand-500/30">
                  {index + 1}
                </span>
                <div className="flex flex-col gap-2 pt-3">
                  <h3 className="display-md text-paper">{step.title}</h3>
                  <p className="body-copy">{step.description}</p>
                </div>
              </RevealItem>
            ))}
          </Reveal>
          <Reveal>
            <CtaBlock location={`landing_${service.slug}_proceso`} message={message} />
          </Reveal>
        </div>
      </section>

      {/* 5. PRUEBA */}
      {proof && (
        <section aria-labelledby="landing-prueba" className="section-y border-y border-mist/10 bg-ink-900">
          <div className="container-page mx-auto max-w-3xl">
            <Reveal>
              <SectionHeading {...landing.proof} id="landing-prueba" />
            </Reveal>
            <Reveal className="mt-10">
              <Card interactive={false} className="flex flex-col gap-5">
                <Quote aria-hidden="true" strokeWidth={1.75} className="size-6 text-brand-500" />
                <blockquote className="lead text-paper">“{proof.quote}”</blockquote>
                <figcaption className="caption-card">
                  <span className="font-semibold text-paper">{proof.name}</span> · {proof.role},{' '}
                  {proof.company}
                </figcaption>
              </Card>
            </Reveal>
            <Reveal className="mt-10">
              <CtaBlock location={`landing_${service.slug}_prueba`} message={message} />
            </Reveal>
          </div>
        </section>
      )}

      {/* 6. INVERSIÓN */}
      <section aria-labelledby="landing-inversion" className="section-y">
        <div className="container-page mx-auto max-w-3xl">
          <Reveal>
            <SectionHeading
              id="landing-inversion"
              eyebrow={landing.investment.eyebrow}
              lines={[
                { text: landing.investment.firstLine, tone: 'light' },
                { text: service.investment.headline.toUpperCase(), tone: 'brand' },
              ]}
            />
          </Reveal>
          <Reveal className="mt-8">
            <Card className="flex flex-col gap-3">
              {service.investment.includes.map((item) => (
                <p key={item} className="flex gap-3 text-mist">
                  <Check aria-hidden="true" strokeWidth={1.75} className="mt-1 size-4 shrink-0 text-brand-500" />
                  {item}
                </p>
              ))}
            </Card>
          </Reveal>
        </div>
      </section>

      {/* 7. OBJECIONES */}
      <section aria-labelledby="landing-objeciones" className="section-y border-y border-mist/10 bg-ink-900">
        <div className="container-page mx-auto flex max-w-3xl flex-col gap-10">
          <Reveal>
            <SectionHeading {...landing.objections} id="landing-objeciones" />
          </Reveal>
          <Reveal>
            <Accordion items={service.faq} />
          </Reveal>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section aria-labelledby="landing-final" className="relative overflow-hidden section-y">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-radial-brand" />
        <Reveal className="container-page flex flex-col items-center gap-8 text-center">
          <SectionHeading {...finalCtaIntro} id="landing-final" align="center" />
          <CtaBlock location={`landing_${service.slug}_final`} message={message} align="center" />
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-brand-400">
            {finalCta.riskReversal}
          </p>
        </Reveal>
      </section>
    </PageShell>
  )
}
