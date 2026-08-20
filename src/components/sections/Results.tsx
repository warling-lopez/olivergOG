import { Quote } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Counter } from '@/components/ui/Counter'
import { Card } from '@/components/ui/Card'
import { Reveal, RevealItem } from '@/components/ui/Reveal'
import { CtaBlock } from '@/components/conversion/CtaBlock'
import { metrics, resultsCopy, resultsIntro, testimonials } from '@/content/results'

export function Results() {
  return (
    <section id="resultados" aria-labelledby="resultados-title" className="scroll-mt-24">
      <div className="container-page section-y flex flex-col gap-14">
        <Reveal>
          <SectionHeading {...resultsIntro} id="resultados-title" />
        </Reveal>

        <Reveal staggerChildren className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {metrics.map((metric) => (
            <RevealItem
              key={metric.label}
              className="flex flex-col gap-2 rounded-card bg-ink-800/60 p-7 ring-hair"
            >
              <span className="display-lg leading-none">
                <Counter value={metric.value} suffix={metric.suffix} />
              </span>
              <span className="caption-card">{metric.label}</span>
            </RevealItem>
          ))}
        </Reveal>

        {testimonials.length > 0 ? (
          <Reveal staggerChildren className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <RevealItem key={testimonial.name} className="group/card h-full">
                <Card className="flex h-full flex-col gap-5">
                  <Quote aria-hidden="true" strokeWidth={1.75} className="size-6 text-brand-500" />
                  <blockquote className="body-copy text-paper">“{testimonial.quote}”</blockquote>
                  <figcaption className="mt-auto flex items-center gap-3">
                    {testimonial.photo && (
                      <img
                        src={testimonial.photo}
                        alt=""
                        width={40}
                        height={40}
                        loading="lazy"
                        className="size-10 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm">
                      <span className="block font-semibold text-paper">{testimonial.name}</span>
                      <span className="caption-card block">
                        {testimonial.role} · {testimonial.company}
                      </span>
                    </span>
                  </figcaption>
                </Card>
              </RevealItem>
            ))}
          </Reveal>
        ) : (
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-7 rounded-card bg-ink-800/40 p-10 text-center ring-hair">
            <p className="body-copy">{resultsCopy.emptyState}</p>
            <CtaBlock location="results_empty" align="center" />
          </Reveal>
        )}
      </div>
    </section>
  )
}
