import { RouterProvider, useRoute } from './lib/router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'

import Home from './pages/Home'
import About from './pages/About'
import Faq from './pages/Faq'
import Contact from './pages/Contact'
import SignUp from './pages/SignUp'
import RiskDisclosure from './pages/RiskDisclosure'
import ThankYou from './pages/ThankYou'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'

function CurrentPage() {
  const { path } = useRoute()

  if (path === '/') return <Home />
  if (path === '/about') return <About />
  if (path === '/faq') return <Faq />
  if (path === '/contact') return <Contact />
  if (path === '/signup') return <SignUp />
  if (path === '/risk-disclosure') return <RiskDisclosure />
  if (path === '/thank-you') return <ThankYou />
  if (path === '/privacy') return <Privacy />
  if (path === '/terms') return <Terms />
  return <NotFound />
}

/**
 * Every route is imported eagerly.
 *
 * These were `lazy()` with a `Suspense` boundary, which kept each page's copy
 * out of the homepage bundle. That is gone, and with it a fair amount of
 * machinery that existed only to serve it: the suspense boundary, the
 * `RouteSettled` context, the `Page` wrapper whose only job was to report when
 * a chunk had arrived, and the footer deferral those fed. There is no chunk to
 * wait for, so there is nothing to hold the footer back from — the layout
 * shift those pieces were written to prevent cannot happen.
 *
 * The cost is on the other side: the entry bundle now carries every page, so a
 * visitor who only reads the homepage downloads the legal pages too. The gain
 * is that navigation is instant and no route ever renders empty first.
 */
export default function App() {
  return (
    <RouterProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Header />

      {/* tabIndex -1 is not for tabbing — it makes the element a valid focus
          target for the router, which moves focus here on every client-side
          navigation so a screen reader announces the new page. */}
      <main id="main" tabIndex={-1}>
        <CurrentPage />
      </main>

      <Footer />
    </RouterProvider>
  )
}
