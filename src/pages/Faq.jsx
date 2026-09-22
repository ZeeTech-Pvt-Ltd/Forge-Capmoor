import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'
import { FaqAccordion } from '../components/FaqAccordion'
import { IconArrowRight } from '../components/Icons'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { FAQ_ITEMS, FAQ_SCHEMA } from '../lib/faq'

import '../styles/pages.css'

/**
 * The full FAQ.
 *
 * This is the only route that emits FAQPage structured data. The homepage
 * shows a three-question teaser and links here; publishing the same schema on
 * both URLs is duplicate structured data, which suppresses rich results
 * rather than doubling them.
 */
export default function Faq() {
  useDocumentMeta({
    title: 'Frequently asked questions | Forge Capmoor',
    description:
      'Straight answers about Forge Capmoor: how automated trading works, where client money is held, how withdrawals are handled, and what the platform does not do.',
    path: '/faq',
  })

  return (
    <article className="section page">
      <div className="container container--narrow">
        <PageHero
          eyebrow="Help centre"
          title="Frequently asked questions"
          lead="Straight answers about how the platform works, what it costs and what happens to your money. Where something is not answered here, it is more likely to be a question we cannot answer yet than one we are avoiding."
        />

        <div className="page__body">
          <FaqAccordion items={FAQ_ITEMS} flush />
        </div>

        <section className="page__section">
          <h2 className="page__section-title">Still not answered?</h2>
          <div className="prose">
            <p>
              Ask us directly and a person will come back to you. If your question is about a
              specific action the system took, mention it, and we can look at the same record you can.
            </p>
          </div>

          <p className="page__actions page__actions--start">
            <Link to="/contact" className="btn btn--primary">
              Contact us
              <IconArrowRight size={18} className="btn__icon" />
            </Link>
            <Link to="/risk-disclosure" className="btn btn--secondary">
              Read the risk disclosure
            </Link>
          </p>
        </section>
      </div>

      <script
        type="application/ld+json"
        // Generated from FAQ_ITEMS — see the note in lib/faq.js.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
    </article>
  )
}
