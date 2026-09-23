/**
 * Every route's search metadata, in one place.
 *
 * There are two consumers and they must not drift:
 *
 *   1. `useDocumentMeta`, which sets the tags on client-side navigation.
 *   2. `scripts/prerender.mjs`, which writes a static HTML file per route at
 *      build time so a crawler that never executes the bundle — which includes
 *      every social scraper — still reads the right title, description,
 *      canonical and Open Graph tags.
 *
 * Before this file existed the two would have been written twice, and the
 * second copy would have been the one nobody updated.
 *
 * `SITE_ORIGIN` is a constant and never `window.location.origin`. That is what
 * stops a preview deployment or a local dev server from canonicalising itself.
 */

export const SITE_ORIGIN = 'https://forge-capmoor.net'
export const SITE_NAME = 'Forge Capmoor'
export const OG_IMAGE = `${SITE_ORIGIN}/og-image.png`
export const OG_IMAGE_ALT =
  'The Forge Capmoor wordmark on a warm off-white ground, with a copper rule beneath it.'

/**
 * Descriptions are written to read as a sentence, not a keyword list. Each one
 * says what the page is for; the topic term appears because the page is about
 * it, not because it was inserted.
 *
 * `noindex: true` drops the canonical as well as adding the robots directive —
 * a noindex page has no canonical URL to declare, and leaving the homepage's
 * in place would claim the page *is* the homepage.
 */
export const ROUTE_META = {
  '/': {
    title: 'Automated Trading That Shows Its Reasoning | Forge Capmoor',
    description:
      'Forge Capmoor is an automated trading platform. It reads the market, trades the strategy you choose, and records the reasoning behind every move it makes.',
  },
  '/about': {
    title: 'About Forge Capmoor | Automated Trading, Explained',
    description:
      'What Forge Capmoor does, how it behaves, and the commitments behind it: a written reason attached to every automated action, and disclosure written to be read.',
  },
  '/faq': {
    title: 'Automated Trading Questions, Answered | Forge Capmoor',
    description:
      'How automated trading works on Forge Capmoor, where client money is held, how deposits and withdrawals are handled, and what the platform does not do.',
  },
  '/contact': {
    title: 'Contact Forge Capmoor | Support and Enquiries',
    description:
      'Reach the Forge Capmoor support team by email or through the account form. Support is staffed around the clock, every day of the year.',
  },
  '/signup': {
    title: 'Open a Trading Account | Forge Capmoor',
    description:
      'Create a Forge Capmoor account. Automation stays off until you switch it on, and nothing is funded or traded until you have been through the account process.',
  },
  '/risk-disclosure': {
    title: 'Risk Disclosure | Forge Capmoor',
    description:
      'The risks of automated and leveraged trading, set out plainly: volatility, liquidity, execution, technology, and the limits of what any AI-assisted tool can do.',
  },
  '/privacy': {
    title: 'Privacy Policy | Forge Capmoor',
    description:
      'What Forge Capmoor collects through this site, why, how long it is kept, and the rights you have over it. The site sets no cookies and makes no third-party requests.',
  },
  '/terms': {
    title: 'Terms of Use | Forge Capmoor',
    description:
      'The terms governing use of the Forge Capmoor website and platform: eligibility, account security, deposits and withdrawals, acceptable use and liability.',
  },
  '/thank-you': {
    title: 'Thank You | Forge Capmoor',
    description: 'Your details reached us. Here is what happens next.',
    noindex: true,
  },
  '/404': {
    title: 'Page Not Found | Forge Capmoor',
    description: 'That page does not exist on forge-capmoor.net.',
    noindex: true,
  },
}

/** The routes to prerender and to list in the sitemap. Derived, never typed twice. */
export const INDEXABLE_ROUTES = Object.entries(ROUTE_META)
  .filter(([, meta]) => !meta.noindex)
  .map(([path]) => path)
