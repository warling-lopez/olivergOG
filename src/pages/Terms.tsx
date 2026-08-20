import { LegalDoc } from '@/components/layout/LegalDoc'
import { terms } from '@/content/legal'

export default function Terms() {
  return <LegalDoc path="/terminos" doc={terms} />
}
