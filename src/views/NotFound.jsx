import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'

import '../styles/pages.css'

export default function NotFound() {
  return (
    <section className="section page">
      <div className="container container--narrow page__inner">
        <PageHero
          center
          eyebrow="404"
          title="That page is not here"
          lead="The link may be out of date, or the address may have a typo in it. Everything on the site is reachable from the homepage."
          actions={
            <>
              <Link to="/" className="btn btn--primary">
                Back to the homepage
              </Link>
              <Link to="/contact" className="btn btn--secondary">
                Contact us
              </Link>
            </>
          }
        />
      </div>
    </section>
  )
}
