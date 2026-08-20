import { ArrowRight, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { services, servicesIntro } from '@/content/services'
import { ROUTES } from '@/config/site'
import { track } from '@/lib/analytics'
import { ui } from '@/content/ui'

export function Services() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="scroll-mt-24">
      <div className="container-page section-y flex flex-col gap-14">
        <Reveal>
          <SectionHeading {...servicesIntro} id="servicios-title" />
        </Reveal>

        <Reveal staggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealItem key={service.slug} className="group/card h-full">
              <Card featured={service.featured} className="flex h-full flex-col gap-5">
                {/* Único uso de oro en la home */}
                {service.badge && (
                  <Badge tone="gold" className="absolute -top-3 right-6">
                    {service.badge}
                  </Badge>
                )}

                <h3 className="display-md text-paper">{service.name}</h3>
                <p className="body-copy">{service.tagline}</p>

                <p className="caption-card">
                  <span className="font-semibold text-mist">{ui.serviceCard.audienceLabel} </span>
                  {service.audience}
                </p>

                <ul className="flex flex-col gap-3 text-sm text-mist">
                  {service.deliverables.slice(0, 4).map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check
                        aria-hidden="true"
                        strokeWidth={1.75}
                        className="mt-0.5 size-4 shrink-0 text-brand-500"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className="mt-auto font-mono text-xs uppercase tracking-[0.2em] text-mist">
                  {service.format}
                </p>

                <Link
                  to={ROUTES.service(service.slug)}
                  onClick={() => track('cta_click', { location: `service_card_${service.slug}` })}
                  className="group/link inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-500"
                >
                  {ui.serviceCard.details}
                  <ArrowRight
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1"
                  />
                </Link>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
