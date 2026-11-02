import Script from 'next/script'

import { Header } from '../src/components/Header'
import { Footer } from '../src/components/Footer'
import { SITE_NAME, SITE_ORIGIN } from '../src/lib/seo'

import './globals.css'

/**
 * The root shell.
 *
 * This file is `index.html` and `src/App.jsx` folded together: the head that
 * used to be hand-written, and the chrome that used to wrap the router. What is
 * left of the old `index.html` is the metadata below, which Next writes into
 * every exported route.
 *
 * The fonts are still self-hosted and still declared in `styles/fonts.css`
 * against files in `public/fonts/`. They were not moved to `next/font` because
 * they already are what `next/font` produces — local woff2, no third-party
 * request — and moving them would rewrite a working setup for no gain. The
 * preloads below are what `next/font` would have emitted anyway.
 */

const GA_ID = 'G-YFG3KCWYST'

export const metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  applicationName: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.png' }],
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'Prs1ha0FTJO_gztMTapv4v1yKL9yY5pc2fhs06oen5s',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FFFFFF',
  colorScheme: 'light',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU">
      <body>
        {/* React hoists these into <head>. Archivo first because it sets the
            headline, which is the largest thing on the first screen. */}
        <link rel="preload" href="/fonts/archivo-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/bricolage-grotesque-latin.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/plus-jakarta-sans-latin.woff2" as="font" type="font/woff2" crossOrigin="" />

        <a className="skip-link" href="#main">
          Skip to content
        </a>

        <Header />

        {/* tabIndex -1 is not for tabbing. It makes the element a valid focus
            target for the router, which moves focus here on navigation so a
            screen reader announces the new page. */}
        <main id="main" tabIndex={-1}>
          {children}
        </main>

        <Footer />

        {/* Analytics is fetched once the page is idle so the tag never competes
            with the document for bandwidth or main-thread time. */}
        <Script
          id="ga-lib"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="lazyOnload"
        />
        <Script id="ga-init" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </body>
    </html>
  )
}
