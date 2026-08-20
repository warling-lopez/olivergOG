import { SectionHeading } from '@/components/ui/SectionHeading'
import { Card } from '@/components/ui/Card'
import { IconCircle } from '@/components/ui/IconCircle'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { pillars, pillarsIntro } from '@/content/pillars'

export function Pillars() {
  return (
    <section id="pilares" aria-labelledby="pilares-title" className="scroll-mt-24">
      <div className="container-page section-y flex flex-col gap-14">
        <Reveal>
          <SectionHeading {...pillarsIntro} id="pilares-title" />
        </Reveal>

        <Reveal staggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => (
            <RevealItem key={pillar.id} className="group/card h-full">
              <Card className="flex h-full flex-col items-start gap-5">
                <IconCircle icon={pillar.icon} />
                <h3 className="display-md text-paper">{pillar.title}</h3>
                <p className="body-copy">{pillar.description}</p>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
