import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'
import { IconArrowRight, IconCheck, IconGraph, IconLayers, IconShield } from '../components/Icons'
import { HeroChartArt } from '../components/TradingArt'

import '../styles/pages.css'

/**
 * How it works, as a page.
 *
 * The first version was a document: a heading, a rule, then three blocks of
 * paragraphs and a row of tiles. Nothing between the hero and the footer had a
 * shape, and a page of left-aligned prose between two dark bands reads as
 * something you are meant to get through rather than look at.
 *
 * This uses the vocabulary the rest of the site already has. The steps are
 * cards on a tinted band, the records section is a dark band with its points
 * laid out like the Technology section, and the closing block is the same one
 * every other page ends on. Each section now has a visual weight rather than
 * just text.
 *
 * Nothing here is a new claim. Every statement is one the site already makes
 * elsewhere, gathered in the order a person actually meets them. Where a detail
 * depends on the operator - the deposit methods, the minimum - it is left out
 * rather than written around.
 */
const STEPS = [
  {
    number: '01',
    title: 'Create the account',
    paragraphs: [
      'Registration asks for your name, an email address and a phone number. Before the account is opened you confirm your identity, which is a legal requirement rather than a preference.',
      'Nothing is funded and nothing trades until that check has been through.',
    ],
  },
  {
    number: '02',
    title: 'Fund the account',
    paragraphs: [
      'Deposits are made through the platform. The methods open to you, and the arrangements that apply, are shown before you commit to a transaction.',
      'Your money is held in a client money account, kept separate from the funds Forge Capmoor operates on. Withdrawals return the way the money came in.',
    ],
  },
  {
    number: '03',
    title: 'Turn automation on, or leave it off',
    paragraphs: [
      'Choose a strategy and the platform places trades in line with it. Every trade keeps its reasoning attached: what was read, which condition was met, and what the risk looked like.',
      'Pausing it costs you nothing else on the account. With it off, the platform still analyses the market and still shows you the reasoning behind each signal.',
    ],
  },
]

const RECORDS = [
  {
    Icon: IconLayers,
    title: 'What was read',
    text: 'The inputs behind a decision, each with the source it came from and when it was last refreshed. A finding that leans on a stale source says so, in the finding.',
  },
  {
    Icon: IconCheck,
    title: 'What condition was met',
    text: 'The rule that triggered the action, kept exactly as written at the time. Not a summary, and not a description written afterwards.',
  },
  {
    Icon: IconShield,
    title: 'What the risk looked like',
    text: 'Volatility and exposure as they stood when the action was taken, so the decision can be judged against the conditions it was made in.',
  },
]

export default function HowItWorksPage() {
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
              eyebrow="How it works"
              title="From sign up to your first automated trade"
              lead="Three stages, in this order. Each one hands the next everything it recorded, so a trade never has to be explained after the fact."
            />

            <p className="page__actions page__actions--start">
              <Link to="/signup" className="btn btn--primary">
                Create an account
                <IconArrowRight size={18} className="btn__icon" />
              </Link>
              <Link to="/risk-disclosure" className="btn btn--secondary">
                Read the risk disclosure
              </Link>
            </p>
          </div>
        </div>
      </div>

      <section className="section section--surface howto__steps" aria-labelledby="howto-steps-title">
        <div className="container container--wide">
          <p className="eyebrow">The three stages</p>
          <h2 className="section-title" id="howto-steps-title">
            What happens at each one
          </h2>

          <ol className="howto__grid">
            {STEPS.map((step) => (
              <li className="howto__card" key={step.number}>
                <span className="howto__num" aria-hidden="true">
                  {step.number}
                </span>
                <h3 className="howto__card-title">{step.title}</h3>
                {step.paragraphs.map((paragraph) => (
                  <p className="howto__card-text" key={paragraph}>
                    {paragraph}
                  </p>
                ))}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--dark howto__records" aria-labelledby="howto-records-title">
        <div className="container container--wide">
          <p className="eyebrow">What is kept</p>
          <h2 className="section-title" id="howto-records-title">
            Every trade carries its own record
          </h2>
          <p className="section-lead">
            At every stage the same three things are kept. They are what a trade is explained with
            later.
          </p>

          <ul className="howto__records-list">
            {RECORDS.map(({ Icon, title, text }) => (
              <li className="howto__record" key={title}>
                <span className="howto__record-icon" aria-hidden="true">
                  <Icon size={22} />
                </span>
                <h3 className="howto__record-title">{title}</h3>
                <p className="howto__record-text">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section howto__close">
        <div className="container">
          {/* A warm card rather than another full-bleed band. The page already
              runs dark hero, tinted steps, dark records; a third dark band
              here would leave the footer with nothing to close. This is the
              page's one warm surface, and it is where the two actions are, so
              the eye lands on it last. */}
          <div className="howto__close-card">
            <p className="eyebrow">Before you start</p>
            <h2 className="howto__close-title">Ready to see it</h2>
            <p className="howto__close-lead">
              Creating an account takes a couple of minutes. Read the risk disclosure first. It is
              short, and it is the part that matters.
            </p>

            <p className="page__actions howto__close-actions">
              <Link to="/signup" className="btn btn--primary">
                Create an account
                <IconArrowRight size={18} className="btn__icon" />
              </Link>
              <Link to="/risk-disclosure" className="btn btn--secondary">
                Read the risk disclosure
              </Link>
            </p>
          </div>
        </div>
      </section>
    </article>
  )
}
