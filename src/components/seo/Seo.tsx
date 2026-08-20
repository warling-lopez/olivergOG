import { useEffect } from 'react'
import { absoluteAsset, absoluteUrl, type SeoMeta } from '@/config/seo'
import { SITE } from '@/config/site'

type Attr = 'name' | 'property'

/** Crea la etiqueta si no existe y la actualiza si ya está. Nunca duplica. */
function setMeta(attr: Attr, key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

/**
 * Escribe los metadatos de la ruta activa en `document.head`.
 * Los bots que no ejecutan JS los reciben del prerender (scripts/prerender.mjs).
 */
export function Seo({ title, description, path, image, noindex, type = 'website' }: SeoMeta) {
  useEffect(() => {
    const canonical = absoluteUrl(path)
    const imageUrl = absoluteAsset(`og/${image ?? 'og-default.jpg'}`)

    document.title = title
    document.documentElement.lang = SITE.locale

    setMeta('name', 'description', description)
    setMeta(
      'name',
      'robots',
      noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1',
    )
    setMeta('name', 'author', SITE.shortName)
    setMeta('name', 'geo.region', 'DO-25')
    setMeta('name', 'geo.placename', SITE.address.city)

    setMeta('property', 'og:type', type)
    setMeta('property', 'og:site_name', SITE.shortName)
    setMeta('property', 'og:locale', 'es_DO')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', canonical)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', title)

    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', imageUrl)

    setLink('canonical', canonical)
  }, [title, description, path, image, noindex, type])

  return null
}
