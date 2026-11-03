import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'
import ReviewsSlider from '../components/ReviewsSlider'
import { IconArrowRight } from '../components/Icons'
import { HeroChartArt } from '../components/TradingArt'

import '../styles/pages.css'

/**
 * Reviews.
 *
 * The quotes are supplied by the operator. They carry no numbers, no return and
 * no accuracy claim - only what using the platform was like - which is the
 * shape a testimonial can take without making a financial promise in a
 * sentence.
 *
 * Each carries a first name, an initial and an Australian city rather than a
 * full name, and no date, because no dates were supplied. If real, sourced
 * reviews replace these, add a `source` and a `url` to each entry so a reader
 * can check them.
 */
const REVIEWS = [
  {
    quote:
      'I had never used anything automated before and I expected to be lost in the settings. Each one explains what it does before you change it, so my first afternoon was far less intimidating than I had braced for.',
    name: 'Priya N.',
    city: 'Melbourne',
  },
  {
    quote:
      'I work office hours, so the thing that sold me was being able to pause it. Knowing I can stop everything in one step is what made me comfortable leaving it running overnight.',
    name: 'Daniel R.',
    city: 'Brisbane',
  },
  {
    quote:
      'The part I use most is the record of what it did and what it passed on. I have learned more from reading that than from any explainer video I sat through beforehand.',
    name: 'Megan T.',
    city: 'Perth',
  },
  {
    quote:
      'I asked a fairly basic question through the contact form and got a straight answer back rather than a sales push. That is rarer in this space than it ought to be.',
    name: 'Sam K.',
    city: 'Adelaide',
  },
  {
    quote:
      'What made me take it seriously was being told upfront that I could lose money. Everywhere else I looked was promising me the opposite, which is exactly why I did not trust any of them.',
    name: 'Laura B.',
    city: 'Sydney',
  },
]

export default function ReviewsPage() {
  return (
    <article className="section page page--dark-hero">
      <div className="container">
        <div className="band-hero">
          <div className="band-hero__bg" aria-hidden="true">
            <HeroChartArt />
          </div>

          <div className="band-hero__text">
            <PageHero
              variant="prominent"
              eyebrow="Reviews"
              title="What people say about using it"
              lead="Reviews from people who have opened an account and traded with the platform."
            />

            <p className="page__actions page__actions--start">
              <Link to="/contact" className="btn btn--primary">
                Get in touch
                <IconArrowRight size={18} className="btn__icon" />
              </Link>
              <Link to="/how-it-works" className="btn btn--secondary">
                See how it works
              </Link>
            </p>
          </div>
        </div>

        <section className="page__section" aria-labelledby="reviews-list-title">
          <p className="eyebrow">In their words</p>
          <h2 className="page__section-title" id="reviews-list-title">
            What stood out to them
          </h2>

          <div className="reviews__slider-wrap">
            <ReviewsSlider reviews={REVIEWS} />
          </div>
        </section>
      </div>
    </article>
  )
}
