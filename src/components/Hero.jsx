import { Link } from '../lib/router'
import { HeroBackdrop } from './HeroBackdrop'

import './Hero.css'

/**
 * Homepage hero.
 *
 * Structure follows the brief's composition: eyebrow, one centred H1, a short
 * supporting paragraph, one primary CTA. The "See how it works" scroll cue that
 * used to sit under the CTA is gone — it was the last `/#section` anchor left
 * anywhere in the site, so the page now has no in-page anchor links at all.
 *
 * The connected-intelligence network is the section's own background layer
 * (`HeroBackdrop`) rather than a block sitting under the copy, so the drawing
 * wraps around the headline instead of waiting below it.
 *
 * Headline options considered:
 *   1. "AI market intelligence you can actually interrogate."
 *   2. "Turn scattered market data into decisions you can explain."
 *   3. "Automated trading that shows its reasoning, not just its signals."
 *
 * (1) leans on a piece of jargon; (2) is clear but drops the category term a
 * first-time visitor is searching for. (3) leads with the category phrase
 * ("automated trading") and carries the differentiator, that the reasoning is
 * visible, inside the 8–14 word target. It is the one in use below.
 *
 * (3) used to read "AI market intelligence that shows its reasoning". The
 * headline was reframed so the page leads as a trading platform rather than a
 * market-intelligence product — the same shift applied to the homepage's
 * section headings. The category phrase a visitor searches for is "automated
 * trading", not "market intelligence".
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__wash" aria-hidden="true" />
      <HeroBackdrop />
      {/* Calms the network behind the copy without hiding it at the edges,
          where the hub and chips are. Sits above the backdrop, below the
          text — both of which are in HeroBackdrop/Hero.css. */}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container container--wide hero__intro">
        <p className="hero__eyebrow">Explainable automated trading</p>

        <h1 id="hero-title" className="hero__title">
          Automated trading that shows its reasoning, not just its signals.
        </h1>

        <p className="hero__lead">
          Forge Capmoor reads the market, trades the strategy you choose, and records why it
          made each move. The reasoning is yours to check, question, or switch off.
        </p>

        <div className="hero__actions">
          <Link to="/signup" className="btn btn--primary btn--lg">
            Create an account
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
