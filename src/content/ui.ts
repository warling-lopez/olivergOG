/**
 * Microcopy compartido de la interfaz (etiquetas, aria-labels, estados).
 * Junto con el resto de src/content, es la única fuente de texto del sitio:
 * ningún componente debe llevar strings visibles.
 */
export const ui = {
  a11y: {
    skipToContent: 'Saltar al contenido',
    logoAlt: 'Oliver G. — Consultoría de negocios',
    whatsappFab: 'Escribir por WhatsApp',
    mainNav: 'Navegación principal',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    homeLink: 'Ir al inicio',
    sectionsNav: 'Secciones',
    legalNav: 'Legal',
  },
  nav: {
    home: 'Inicio',
  },
  footer: {
    sectionsTitle: 'Secciones',
    legalTitle: 'Legal',
    privacy: 'Política de privacidad',
    terms: 'Términos y condiciones',
    rights: 'Todos los derechos reservados.',
  },
  serviceCard: {
    audienceLabel: 'Para quién es:',
    details: 'Ver detalles',
  },
  content: {
    read: 'Leer',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
  },
  sticky: {
    whatsapp: 'WhatsApp',
  },
  legal: {
    updatedLabel: 'Última actualización:',
  },
  notFound: {
    code: '404',
  },
  cookies: {
    ariaLabel: 'Aviso de cookies',
    text: 'Usamos cookies de analítica para entender cómo se usa el sitio. Puedes rechazarlas sin perder ninguna función. Más detalles en la',
    accept: 'Aceptar',
    reject: 'Rechazar',
  },
} as const

/** Encabezados de los bloques de la landing de venta (titular bicolor). */
export const landing = {
  problems: {
    eyebrow: '¿TE SUENA?',
    lines: [
      { text: 'SEÑALES DE QUE', tone: 'light' },
      { text: 'ES MOMENTO', tone: 'brand' },
    ],
  },
  solution: {
    eyebrow: 'QUÉ INCLUYE',
    firstLine: 'ESTO ES',
  },
  process: {
    eyebrow: 'CÓMO LO HACEMOS',
    lines: [
      { text: 'EL PROCESO', tone: 'light' },
      { text: 'PASO A PASO', tone: 'brand' },
    ],
  },
  proof: {
    eyebrow: 'PRUEBA',
    lines: [
      { text: 'QUIEN YA PASÓ', tone: 'light' },
      { text: 'POR AQUÍ', tone: 'brand' },
    ],
  },
  investment: {
    eyebrow: 'INVERSIÓN',
    firstLine: 'TU INVERSIÓN',
  },
  objections: {
    eyebrow: 'DUDAS FRECUENTES',
    lines: [
      { text: 'ANTES', tone: 'light' },
      { text: 'DE DECIDIR', tone: 'brand' },
    ],
  },
  audienceLabel: 'Para quién es:',
  whatsappMessagePrefix: 'Hola Oliver, me interesa el servicio de',
} as const satisfies Record<string, unknown>
