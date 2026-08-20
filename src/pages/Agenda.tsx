import { ArrowLeft, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageShell } from '@/components/layout/PageShell'
import { Logo } from '@/components/layout/Logo'
import { ContactForm } from '@/components/conversion/ContactForm'
import { WhatsAppButton } from '@/components/conversion/WhatsAppButton'
import { agendaPage } from '@/content/cta'
import { ROUTES, SITE } from '@/config/site'
import { telLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

/**
 * Fricción cero: sin navbar ni footer, solo logo y volver.
 * Tres campos que terminan en un mensaje de WhatsApp, y una salida directa
 * al chat para quien no quiera llenar nada.
 */
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

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-5">
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

            {/* Salida directa, siempre visible: no todo el mundo quiere un formulario. */}
            <div className="rounded-card bg-ink-800/60 p-7 ring-hair">
              <p className="display-md text-paper">{agendaPage.altHeadline}</p>
              <p className="body-copy mt-3">{agendaPage.altBody}</p>
              <WhatsAppButton
                message={agendaPage.whatsappMessage}
                location="agenda_directo"
                variant="whatsapp"
                className="mt-5 w-full"
              >
                {agendaPage.altCta}
              </WhatsAppButton>
              <a
                href={telLink()}
                onClick={() => track('phone_click', { location: 'agenda' })}
                className="caption-card mt-4 block text-center transition-colors hover:text-paper"
              >
                {SITE.contact.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm location="agenda" />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
