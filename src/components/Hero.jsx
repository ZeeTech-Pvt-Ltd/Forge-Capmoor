import { Link } from '../lib/router'
import { HeroChartArt } from './TradingArt'

import './Hero.css'

/**
 * Homepage hero.
 *
 * Structure: one centred H1, a short supporting paragraph, two actions —
 * primary for the visitor who is ready, secondary for the one who is not.
 *
 * There is no eyebrow above the headline. "Explainable automated trading" was
 * labelling the block for someone who had already read the headline under it,
 * and on a dark band a grey uppercase pill was the weakest thing in it. The
 * headline is the first thing now.
 *
 * The "See how it works" scroll cue that
 * used to sit under the CTA is gone — it was the last `/#section` anchor left
 * anywhere in the site, so the page now has no in-page anchor links at all.
 *
 * One backdrop, not three. A market chart sits behind the copy, and that is the
 * whole of the decoration — an earlier revision stacked a chart, eight
 * connectors, a hub and four guide rings on top of each other, and the sum
 * read as noise rather than as a drawing. Each piece was fine alone; together
 * they said nothing. If something is added here, something else comes out.
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
      {/* The trading backdrop, deepest of the three layers. It is the one that
          says what the product is about before a word is read — the network
          behind the hub is abstract, and a market chart is not. Faint enough
          that it reads as a surface rather than as a figure. */}
      <div className="hero__market" aria-hidden="true">
        <HeroChartArt />
      </div>
      {/* Calms the chart behind the copy so the headline keeps full contrast,
          and fades out before the edges so the drawing still reads there.
          Sits above the chart, below the text. */}
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container container--wide hero__intro">
        <h1 id="hero-title" className="hero__title">
          Automated trading that shows its reasoning, not just its signals.
        </h1>

        <p className="hero__lead">
          Forge Capmoor reads the market, trades the strategy you choose, and records why it
          made each move. The reasoning is yours to check, question, or switch off.
        </p>

        {/* Two actions, not one. A hero with a single button reads as a
            landing page that has not decided what to offer next; the second
            is for the visitor who is not ready to sign up, and it goes
            somewhere real rather than to another anchor. */}
        <div className="hero__actions">
          <Link to="/signup" className="btn btn--primary btn--lg">
            Create an account
          </Link>
          <Link to="/about" className="btn btn--secondary btn--lg">
            How the platform works
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
