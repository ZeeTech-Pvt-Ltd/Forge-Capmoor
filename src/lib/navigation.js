/**
 * Single source of truth for site navigation.
 *
 * Header and Footer both read from here so the two can never disagree.
 *
 * Every link here points at a real page. The header used to link into
 * homepage sections (`/#how-it-works` and friends); those are gone, so nothing
 * in the chrome pretends a section is a page. SECTION_IDS stays because the
 * homepage sections still need ids for their own aria-labelledby wiring.
 */

export const SECTION_IDS = {
  howItWorks: 'how-it-works',
  capabilities: 'capabilities',
  technology: 'technology',
  security: 'security',
  toolkit: 'toolkit',
  domains: 'data-domains',
  faq: 'faq',
  getStarted: 'get-started',
}

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_COMPANY_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About us', to: '/about' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export const FOOTER_LEGAL_LINKS = [
  { label: 'Terms of use', to: '/terms' },
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Risk disclosure', to: '/risk-disclosure' },
]
