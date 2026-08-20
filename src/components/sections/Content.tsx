import { ArrowUpRight } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { InstagramIcon, LinkedinIcon } from '@/components/ui/SocialIcons'
import { contentCopy, contentIntro, posts } from '@/content/content'
import { SITE } from '@/config/site'
import { ui } from '@/content/ui'

export function Content() {
  return (
    <section
      id="contenido"
      aria-labelledby="contenido-title"
      className="scroll-mt-24 border-y border-mist/10 bg-ink-900"
    >
      <div className="container-page section-y flex flex-col gap-14">
        <Reveal>
          <SectionHeading {...contentIntro} id="contenido-title" />
        </Reveal>

        {posts.length > 0 && (
          <Reveal staggerChildren className="grid gap-6 md:grid-cols-3">
            {posts.map((post) => (
              <RevealItem key={post.title} className="group/card h-full">
                <Card className="flex h-full flex-col gap-4">
                  <Badge>{post.tag}</Badge>
                  <h3 className="display-md text-paper">{post.title}</h3>
                  <p className="body-copy">{post.excerpt}</p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-400 transition-colors hover:text-brand-500"
                  >
                    {ui.content.read}
                    <ArrowUpRight
                      aria-hidden="true"
                      strokeWidth={1.75}
                      className="size-4 transition-transform duration-200 ease-out group-hover/link:translate-x-1"
                    />
                  </a>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        )}

        <Reveal className="flex flex-col items-start gap-5">
          <p className="body-copy">{contentCopy.socialCta}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              href={SITE.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <InstagramIcon className="size-4" />
              {ui.content.instagram}
            </ButtonLink>
            <ButtonLink
              href={SITE.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
            >
              <LinkedinIcon className="size-4" />
              {ui.content.linkedin}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
