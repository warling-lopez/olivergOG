import { useEffect } from 'react'

/** Inyecta un bloque application/ld+json y lo retira al desmontar. */
export function JsonLd({ id, data }: { id: string; data: object }) {
  useEffect(() => {
    document.getElementById(id)?.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = id
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)
    return () => {
      script.remove()
    }
  }, [id, data])

  return null
}
