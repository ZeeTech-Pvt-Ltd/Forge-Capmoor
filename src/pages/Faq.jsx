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
  useDocumentMeta('/faq')

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

        {/* The page ends on an answer, not a form field — the accordion above is
            already the long read, so this is one short block with the two things
            a person can do next. Given its own card rather than the plain
            section rhythm, because after twenty-odd collapsed rows the page
            needs something that reads as an ending. */}
        <section className="page__section faq__help">
          <div className="faq__help-card">
            <p className="eyebrow">Still not answered?</p>
            <h2 className="faq__help-title">Ask us directly</h2>
            <p className="faq__help-body">
              A person will come back to you. If your question is about a specific action the
              system took, mention it, and we can look at the same record you can.
            </p>

            <p className="page__actions page__actions--start">
              <Link to="/contact" className="btn btn--primary">
                Contact us
                <IconArrowRight size={18} className="btn__icon" />
              </Link>
              <Link to="/risk-disclosure" className="btn btn--secondary">
                Read the risk disclosure
              </Link>
            </p>
          </div>
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
