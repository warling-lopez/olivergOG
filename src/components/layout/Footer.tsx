import { Link } from 'react-router-dom'
import { Phone, MapPin } from 'lucide-react'
import { Logo } from './Logo'
import { SectionLink } from './SectionLink'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { SITE, SECTIONS, ROUTES, CTA_LABEL } from '@/config/site'
import { ui } from '@/content/ui'
import { telLink } from '@/lib/whatsapp'
import { track } from '@/lib/analytics'

const socialLinkClass =
  'inline-flex size-11 items-center justify-center rounded-btn ring-1 ring-mist/20 text-mist transition-colors hover:text-brand-400 hover:ring-brand-500'

export function Footer() {
  return (
    /* pb extra en móvil para que el StickyCta no tape el contenido */
    <footer className="border-t border-mist/10 bg-ink-950 pb-24 md:pb-0">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="flex flex-col gap-5 md:col-span-5">
          <Logo />
          <p className="body-copy max-w-sm">{SITE.person.jobTitle}</p>

          {/* NAP — idéntico al de Google Business Profile */}
          <address className="flex flex-col gap-2 text-sm not-italic text-mist">
            <span className="font-semibold text-paper">{SITE.person.legalName}</span>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" strokeWidth={1.75} className="size-4 text-brand-500" />
              {SITE.address.city}, {SITE.address.countryName}
            </span>
            <a
              href={telLink()}
              onClick={() => track('phone_click', { location: 'footer' })}
              className="inline-flex items-center gap-2 hover:text-paper"
            >
              <Phone aria-hidden="true" strokeWidth={1.75} className="size-4 text-brand-500" />
              {SITE.contact.phoneDisplay}
            </a>
          </address>

          <div className="flex gap-3">
            <a
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.content.instagram}
              className={socialLinkClass}
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.content.linkedin}
              className={socialLinkClass}
            >
              <LinkedinIcon className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label={ui.a11y.sectionsNav} className="md:col-span-4">
          <h2 className="eyebrow mb-5">{ui.footer.sectionsTitle}</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm text-mist">
            {SECTIONS.map((section) => (
              <li key={section.id}>
                <SectionLink id={section.id} className="transition-colors hover:text-paper">
                  {section.label}
                </SectionLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={ui.a11y.legalNav} className="md:col-span-3">
          <h2 className="eyebrow mb-5">{ui.footer.legalTitle}</h2>
          <ul className="flex flex-col gap-2 text-sm text-mist">
            <li>
              <Link to={ROUTES.privacy} className="transition-colors hover:text-paper">
                {ui.footer.privacy}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.terms} className="transition-colors hover:text-paper">
                {ui.footer.terms}
              </Link>
            </li>
            <li>
              <Link to={ROUTES.agenda} className="transition-colors hover:text-paper">
                {CTA_LABEL}
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-mist/10 py-6">
        <p className="container-page caption">
          © {new Date().getFullYear()} {SITE.person.legalName}. {ui.footer.rights}
        </p>
      </div>
    </footer>
  )
}
