import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { Badge } from '@/components/ui/Badge'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { about, aboutIntro } from '@/content/about'
import { SITE, asset } from '@/config/site'
import { ui } from '@/content/ui'

const socialClass =
  'inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-brand-400'

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="scroll-mt-24 border-y border-mist/10 bg-ink-900"
    >
      <div className="container-page section-y grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="order-2 lg:order-1 lg:col-span-7">
          <SectionHeading {...aboutIntro} id="sobre-title" />

          <div className="mt-8 flex flex-col gap-4">
            {about.bio.map((paragraph) => (
              <p key={paragraph} className="body-copy">
                {paragraph}
              </p>
            ))}
          </div>

          <dl className="mt-10 grid gap-4 sm:grid-cols-2">
            {about.credentials.map((credential) => (
              <div key={credential.label} className="rounded-card bg-ink-800/60 p-5 ring-hair">
                <dt className="eyebrow">{credential.label}</dt>
                <dd className="mt-2 font-display font-bold text-paper">{credential.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-2">
            {about.sectors.map((sector) => (
              <Badge key={sector}>{sector}</Badge>
            ))}
          </div>

          <div className="mt-8 flex gap-6">
            <a href={SITE.social.instagram} target="_blank" rel="me noopener noreferrer" className={socialClass}>
              <InstagramIcon className="size-4" /> {ui.content.instagram}
            </a>
            <a href={SITE.social.linkedin} target="_blank" rel="me noopener noreferrer" className={socialClass}>
              <LinkedinIcon className="size-4" /> {ui.content.linkedin}
            </a>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2 lg:col-span-5">
          <div className="relative overflow-hidden rounded-card ring-hair">
            <img
              src={asset(about.photo)}
              alt={about.photoAlt}
              width={800}
              height={1000}
              loading="lazy"
              className="aspect-4/5 w-full object-cover"
            />
            {/* Overlay obligatorio: nunca texto ni foto a plena opacidad sobre el navy */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent"
            />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
