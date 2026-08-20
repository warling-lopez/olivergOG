import { PageShell } from '@/components/layout/PageShell'
import { ButtonRoute } from '@/components/ui/Button'
import { notFound } from '@/content/cta'
import { CTA_LABEL, ROUTES } from '@/config/site'
import { ui } from '@/content/ui'

export default function NotFound() {
  return (
    <PageShell path="/404" chrome="bare">
      <div className="container-page flex min-h-screen flex-col items-center justify-center gap-6 py-16 text-center">
        <p className="display-xl text-brand-500">{ui.notFound.code}</p>
        <h1 className="display-lg text-paper">{notFound.title}</h1>
        <p className="lead max-w-md">{notFound.subtitle}</p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <ButtonRoute to={ROUTES.agenda} size="lg">
            {CTA_LABEL}
          </ButtonRoute>
          <ButtonRoute to={ROUTES.home} variant="secondary" size="lg">
            {notFound.back}
          </ButtonRoute>
        </div>
      </div>
    </PageShell>
  )
}
