import { Link } from '../lib/router'
import { HeroChartArt } from './TradingArt'

import './Hero.css'

/**
 * Homepage hero.
 *
 * One headline, one supporting paragraph, one action and the microcopy that
 * sits under it. The content comes from the supplied document and keeps the
 * entry, exit and reasoning as the single promise of the block.
 *
 * The chart behind the copy is the only decoration. It is abstract artwork,
 * not a live feed.
 */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__market" aria-hidden="true">
        <HeroChartArt />
      </div>
      <div className="hero__overlay" aria-hidden="true" />

      <div className="container container--wide hero__intro">
        <h1 id="hero-title" className="hero__title">
          Know Your Entry, Exit and Reason Before You Trade
        </h1>

        <p className="hero__lead">
          Forge Capmoor turns market research into simple trade alerts you can act on in
          minutes. Every signal shows where to get in, where to get out and why the setup
          makes sense.
        </p>

        <div className="hero__actions">
          <Link to="/signup" className="btn btn--primary btn--lg">
            Claim Your Free Account
          </Link>
        </div>

        <p className="hero__micro">Fast sign-up · No surprise charges · Secure by design</p>
      </div>
    </section>
  )
}

export default Hero
