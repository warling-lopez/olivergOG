import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import { thankYou } from '@/content/cta'
import { ROUTES } from '@/config/site'

export default function ThankYou() {
  return (
    <PageShell path="/gracias" chrome="bare">
      <div className="container-page flex min-h-screen flex-col items-center justify-center gap-7 py-16 text-center">
        <CheckCircle2 aria-hidden="true" strokeWidth={1.75} className="size-16 text-brand-500" />
        <h1 className="display-lg text-paper">{thankYou.title}</h1>
        <p className="lead max-w-xl">{thankYou.subtitle}</p>

        <ul className="mx-auto flex w-full max-w-md flex-col gap-3 text-left">
          {thankYou.next.map((item) => (
            <li key={item} className="rounded-card bg-ink-800/60 p-5 text-mist ring-hair">
              {item}
            </li>
          ))}
        </ul>

        <Link to={ROUTES.home} className="text-sm text-brand-400 transition-colors hover:text-brand-500">
          {thankYou.back}
        </Link>
      </div>
    </PageShell>
  )
}
