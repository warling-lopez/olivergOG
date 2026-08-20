import { ArrowLeft, Check, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { Logo } from '@/components/layout/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { CalendlyEmbed } from '@/components/conversion/CalendlyEmbed'
import { LeadForm } from '@/components/conversion/LeadForm'
import { agendaPage } from '@/content/cta'
import { CTA_WHATSAPP_LABEL, ROUTES, SITE } from '@/config/site'
import { whatsappLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

/** Página de fricción cero: sin navbar ni footer, solo logo y calendario. */
export default function Agenda() {
  return (
    <PageShell path="/agenda" chrome="bare" whatsappMessage={agendaPage.whatsappMessage}>
      <div className="container-page flex flex-col gap-12 py-8">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            to={ROUTES.home}
            className="inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-paper"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="size-4" />
            {agendaPage.back}
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-4">
            <h1 className="display-lg text-paper">{agendaPage.title}</h1>
            <p className="lead">{agendaPage.subtitle}</p>

            <ul className="flex flex-col gap-4">
              {agendaPage.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3 text-mist">
                  <Check
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mt-1 size-4 shrink-0 text-brand-500"
                  />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="rounded-card bg-ink-800/60 p-7 ring-hair">
              <p className="display-md text-paper">{agendaPage.altHeadline}</p>
              <ButtonLink
                href={whatsappLink(agendaPage.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                className="mt-5 w-full"
                onClick={() => track('whatsapp_click', { location: 'agenda_page', page: ROUTES.agenda })}
              >
                <MessageCircle aria-hidden="true" strokeWidth={1.75} className="size-4" />
                {CTA_WHATSAPP_LABEL}
              </ButtonLink>
              <p className="caption-card mt-4 text-center">{SITE.contact.phoneDisplay}</p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <CalendlyEmbed />
          </div>
        </div>

        {/* Vía alternativa, debajo del calendario para no añadir fricción arriba. */}
        <section aria-labelledby="agenda-form" className="mx-auto w-full max-w-3xl pb-8">
          <h2 id="agenda-form" className="display-md text-paper">
            {agendaPage.formHeadline}
          </h2>
          <p className="body-copy mt-3">{agendaPage.formSubtitle}</p>
          <div className="mt-8">
            <LeadForm location="agenda_page" />
          </div>
        </section>
      </div>
    </PageShell>
  )
}
