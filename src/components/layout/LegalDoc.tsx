import { PageShell } from './PageShell'
import { ui } from '@/content/ui'

export interface LegalDocument {
  title: string
  updatedAt: string
  sections: { heading: string; body: string }[]
}

export function LegalDoc({ path, doc }: { path: string; doc: LegalDocument }) {
  return (
    <PageShell path={path}>
      <article className="container-page mx-auto max-w-3xl pb-24 pt-36">
        <h1 className="display-lg text-paper">{doc.title}</h1>
        <p className="caption mt-3">
          {ui.legal.updatedLabel} {doc.updatedAt}
        </p>

        <div className="mt-12 flex flex-col gap-9">
          {doc.sections.map((section) => (
            <section key={section.heading} className="flex flex-col gap-3">
              <h2 className="display-md text-paper">{section.heading}</h2>
              <p className="body-copy">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </PageShell>
  )
}
