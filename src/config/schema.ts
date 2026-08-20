import { SITE } from './site'
import { absoluteAsset, absoluteUrl } from './seo'
import { services } from '@/content/services'
import { faq } from '@/content/faq'
import type { Service } from '@/types'

const PERSON_ID = `${SITE.url}/#person`
const BUSINESS_ID = `${SITE.url}/#business`
const WEBSITE_ID = `${SITE.url}/#website`

const postalAddress = {
  '@type': 'PostalAddress',
  addressLocality: SITE.address.city,
  addressRegion: SITE.address.region,
  addressCountry: SITE.address.country,
}

/** Person + ProfessionalService + WebSite. Va en todas las páginas. */
export const siteGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': PERSON_ID,
      name: SITE.person.name,
      jobTitle: SITE.person.jobTitle,
      url: absoluteUrl('/'),
      image: absoluteAsset('img/oliver-about.svg'),
      telephone: SITE.contact.phone,
      address: postalAddress,
      sameAs: [SITE.social.instagram, SITE.social.linkedin].filter(Boolean),
      knowsAbout: [
        'Estrategia empresarial',
        'Consultoría de negocios',
        'Crecimiento de pymes',
        'Liderazgo y gestión',
      ],
      knowsLanguage: ['es', 'en'],
    },
    {
      '@type': 'ProfessionalService',
      '@id': BUSINESS_ID,
      name: 'Oliver G. — Consultoría de Negocios',
      image: absoluteAsset('og/og-default.jpg'),
      url: absoluteUrl('/'),
      telephone: SITE.contact.phone,
      priceRange: '$$',
      founder: { '@id': PERSON_ID },
      address: postalAddress,
      areaServed: [
        { '@type': 'City', name: SITE.address.city },
        { '@type': 'Country', name: SITE.address.countryName },
      ],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de consultoría',
        itemListElement: services.map((service) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: service.name },
          url: absoluteUrl(`/servicios/${service.slug}`),
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: absoluteUrl('/'),
      name: SITE.name,
      inLanguage: SITE.locale,
      publisher: { '@id': PERSON_ID },
    },
  ],
}

/**
 * FAQPage generado desde content/faq.ts para que jamás se desincronice
 * del texto visible en pantalla.
 */
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer },
  })),
}

/** Service + BreadcrumbList de una landing de venta. */
export function serviceGraph(service: Service, description: string) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        serviceType: service.name,
        name: service.name,
        provider: { '@id': PERSON_ID },
        areaServed: { '@type': 'Country', name: SITE.address.countryName },
        description,
        url: absoluteUrl(`/servicios/${service.slug}`),
        offers: {
          '@type': 'Offer',
          priceCurrency: 'DOP',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${absoluteUrl('/')}#servicios` },
          {
            '@type': 'ListItem',
            position: 3,
            name: service.name,
            item: absoluteUrl(`/servicios/${service.slug}`),
          },
        ],
      },
    ],
  }
}
