/**
 * Única fuente de verdad del sitio.
 * Nunca escribas la URL, el teléfono ni el base path a mano en otro archivo:
 * impórtalos desde aquí. Migrar a un dominio propio = cambiar `url`.
 */
import { ENV } from './env'

const env = ENV

/** Coincide con `base` de vite.config.ts y con `import.meta.env.BASE_URL`. */
const BASE = '/olivergOG/'
const ORIGIN = 'https://myprofolio.grolow.com'

export const SITE = {
  name: 'Oliver G. | Consultoría de Negocios',
  shortName: 'Oliver G.',
  base: BASE,
  /** Raíz del host, sin barra final. La comparte con Grolow Portfolios. */
  origin: ORIGIN,
  /** Canónica del sitio, sin barra final: `${SITE.url}${path}`. */
  url: env.VITE_SITE_URL ?? `${ORIGIN}/olivergOG`,
  locale: 'es-DO',

  person: {
    name: 'Oliver G.',
    jobTitle: 'Consultor de Negocios y Estratega Empresarial',
    /** TODO_CLIENTE: nombre legal completo */
    legalName: 'TODO_CLIENTE',
  },

  contact: {
    phone: '+18298847499',
    phoneDisplay: '829 884 7499',
    whatsapp: env.VITE_WHATSAPP ?? '18298847499',
    /** TODO_CLIENTE: correo de contacto real */
    email: 'TODO_CLIENTE@dominio.com',
  },

  /** Debe coincidir carácter por carácter con Google Business Profile. */
  address: {
    city: 'Santiago de los Caballeros',
    region: 'Santiago',
    country: 'DO',
    countryName: 'República Dominicana',
    /** TODO_CLIENTE: calle y código postal si atiende presencial */
    street: '',
    postalCode: '',
  },

  social: {
    instagram: 'https://instagram.com/TODO_CLIENTE',
    linkedin: 'https://linkedin.com/in/TODO_CLIENTE',
    facebook: '',
  },

  calendlyUrl: env.VITE_CALENDLY_URL ?? 'https://calendly.com/TODO_CLIENTE/30min',

  /** Endpoint del formulario (Formspree / Web3Forms / Formsubmit). */
  formEndpoint: env.VITE_FORM_ENDPOINT ?? '',

  analytics: {
    ga4: env.VITE_GA4_ID ?? '',
    metaPixel: env.VITE_META_PIXEL_ID ?? '',
  },
} as const

export const ROUTES = {
  home: '/',
  agenda: '/agenda',
  service: (slug: string) => `/servicios/${slug}`,
  thankYou: '/gracias',
  privacy: '/privacidad',
  terms: '/terminos',
} as const

/** Secciones del one-page — alimenta la navbar, el footer y useActiveSection. */
export const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'propuesta', label: 'Propuesta' },
  { id: 'pilares', label: 'Pilares' },
  { id: 'sobre', label: 'Sobre Oliver' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'metodologia', label: 'Metodología' },
  { id: 'resultados', label: 'Resultados' },
  { id: 'contenido', label: 'Contenido' },
  { id: 'faq', label: 'Preguntas' },
  { id: 'agenda', label: 'Agenda' },
] as const

/** Un solo verbo de CTA en todo el sitio. Nunca variarlo. */
export const CTA_LABEL = 'Agenda tu cita'
export const CTA_WHATSAPP_LABEL = 'Hablemos por WhatsApp'

/** URL absoluta para canonical, Open Graph y JSON-LD. */
export const absUrl = (path = '/'): string => `${SITE.url}${path === '/' ? '/' : path}`

/** URL absoluta de un archivo de /public. */
export const absAsset = (file: string): string => `${SITE.url}/${file.replace(/^\//, '')}`

/**
 * Ruta de un asset de /public respetando la subcarpeta.
 * En Node (scripts de build) `BASE_URL` no existe: cae a SITE.base.
 */
export const asset = (path: string): string =>
  `${env.BASE_URL ?? SITE.base}${path.replace(/^\//, '')}`

/** Altura de la navbar fija: offset al saltar a un #ancla. */
export const NAVBAR_OFFSET = 84
