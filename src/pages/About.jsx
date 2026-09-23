import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { IconArrowRight, IconBolt, IconCheck, IconClose, IconCompass, IconEye, IconLock, IconShield } from '../components/Icons'
import { ActArt, ContextArt, HeroChartArt, ReasoningArt } from '../components/TradingArt'

import '../styles/pages.css'

/**
 * About us.
 *
 * There is no company history here, and that is deliberate. A founding story,
 * a launch date and a growth curve are the easiest things in the world to
 * write and the hardest to stand behind — so this page carries what the
 * platform does and how it behaves instead of a timeline nobody can check.
 */

const DIFFERENTIATORS = [
  {
    Icon: IconBolt,
    art: <ActArt />,
    title: 'It acts, not just alerts',
    text: 'The system watches the market continuously and executes when its conditions are met, so a setup does not have to wait for you to be at a screen. Automation is a setting you control, not a commitment you make.',
  },
  {
    Icon: IconEye,
    art: <ReasoningArt />,
    title: 'The reasoning is kept',
    text: 'Every automated action is stored with the inputs behind it: what was read, which condition was met, what the risk context looked like. You can follow any action back to its source and disagree with it on the evidence.',
  },
  {
    Icon: IconCompass,
    art: <ContextArt />,
    title: 'Answers in context',
    text: 'When you ask about something the system did, the answer can point at the same record you are looking at, rather than at a description of how the platform generally works.',
  },
]

const VALUES = [
  {
    title: 'Accessible',
    text: 'Trading tools should not require a finance degree to operate. Every screen is built to be understood on first use, so someone opening an account for the first time is not left guessing what a control does.',
  },
  {
    title: 'Transparent',
    text: 'What you see is what you get. Any fee that applies is shown before you commit to anything, and the platform rules sit in plain language rather than in a document nobody opens.',
  },
  {
    title: 'Innovative',
    text: 'The analysis is refined continuously rather than left to age. When the models change, the change is visible in what the platform records about its own decisions.',
  },
  {
    title: 'Responsible',
    text: 'Risk is explained in the same plain language as everything else, and it is explained before you fund an account rather than after. Automation that hides its losses is not a feature.',
  },
]

const SECURITY = [
  {
    Icon: IconLock,
    title: 'Encrypted in transit',
    text: 'Traffic to and from this site is served over HTTPS, so credentials and personal details are not sent in the clear.',
  },
  {
    Icon: IconShield,
    title: 'Two-factor authentication',
    text: 'Accounts can be protected with a second factor before they are reachable, because a password on its own is a single point of failure.',
  },
  {
    Icon: IconCheck,
    title: 'Withdrawals confirmed first',
    text: 'A withdrawal is not released on a single click. It is confirmed through the account before it moves, and additional identification may be required on a first withdrawal.',
  },
]

export default function About() {
  useDocumentMeta('/about')

  return (
    <article className="section page page--dark-hero">
      <div className="container">
        {/* Split hero: the copy on the left, the chart on the right. The chart
            is the page's one large drawing and it belongs beside the headline
            rather than under it — on its own it read as a figure the reader
            arrived at before knowing what they were looking at. */}
        <div className="about__hero">
          {/* Background, not a panel. The chart sits behind the copy at reduced
              opacity, the way the homepage's network sits behind its hero — the
              page opens with the drawing rather than arriving at it after the
              headline. aria-hidden because the Capabilities section states the
              same ideas in text. */}
          <div className="about__hero-bg" aria-hidden="true">
            <HeroChartArt />
          </div>

          <div className="about__hero-text">
            <PageHero
              variant="prominent"
              eyebrow="About us"
              title="Automated trading, with the working shown"
              lead="Forge Capmoor reads the market continuously and acts on what it finds. It never asks you to accept an action on trust: every automated trade carries the reasoning that produced it."
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

        <section className="page__section about__story">
          <div className="about__story-art">
            {/* The one photograph on the site. Served as WebP at three widths
                with the intrinsic size declared, so the column reserves its
                space before the file arrives and there is no shift. Lazy: it is
                below the fold on every viewport.

                The artwork is used as supplied. It carries a feed of three
                named people — one who "deposited $2,500", one who "made a
                profit" — and a "Live" badge over a price. Those are claims
                about customers and about live data that this site does not
                otherwise make, and they were kept at the owner's instruction
                rather than by oversight.

                Two passages that would have contradicted it were removed at
                the same time: the sentence here that said no user counts,
                deposit totals or win rates appear on this site, and the note
                in the DataDomains section that said no performance figures
                appear anywhere on it. If the artwork is ever replaced, both
                passages are worth restoring. */}
            <img
              src="/about-2-960.webp"
              srcSet="/about-2-640.webp 640w, /about-2-960.webp 960w, /about-2-1200.webp 1200w"
              sizes="(max-width: 899px) 352px, 39vw"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
              alt="A person holding a tablet beside a market chart on a tablet screen."
            />
          </div>

          <div>
            <p className="eyebrow">Why we build it this way</p>
            <h2 className="page__section-title">Most automated trading is opaque by accident</h2>
            <div className="prose">
              <p>
                A position appears, the balance moves, and the reason is somewhere in a log you
                cannot read. That is not a limitation of automation. It is a choice about how much
                of it to show you, and most platforms choose to show as little as possible.
              </p>
              <p>
                We built Forge Capmoor the other way round. The record of why an action was taken
                is part of the product rather than a by-product of it, and it is written for the
                person whose money is at stake rather than for the engineer who wrote the rule.
              </p>
              <p>
                That has a cost. It means we publish what we can evidence and leave out what we
                cannot.
              </p>
            </div>
          </div>
        </section>

        <section className="page__section">
          <p className="eyebrow">What we focus on</p>
          <h2 className="page__section-title">Three things the product is built around</h2>

          <div className="tiles">
            {DIFFERENTIATORS.map(({ Icon, art, title, text }) => (
              <div key={title} className="tile tile--art">
                <div className="tile__art">{art}</div>
                <span className="tile__icon">
                  <Icon size={22} />
                </span>
                <h3 className="tile__title">{title}</h3>
                <p className="tile__text">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="page__section">
          <p className="eyebrow">How we work</p>
          <h2 className="page__section-title">Four commitments that decide what ships</h2>

          <ol className="commitments">
            {VALUES.map((value, index) => (
              <li key={value.title} className="commitment">
                <span className="commitment__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="commitment__title">{value.title}</h3>
                <p className="commitment__text">{value.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="page__section">
          <h2 className="page__section-title">Security and data protection</h2>
          <p className="page__section-lead">
            The measures are described rather than rated. No online system is immune to risk, and
            claiming otherwise would be the least trustworthy thing on this page.
          </p>

          <div className="tiles">
            {SECURITY.map(({ Icon, title, text }) => (
              <div key={title} className="tile">
                <span className="tile__icon">
                  <Icon size={22} />
                </span>
                <h3 className="tile__title">{title}</h3>
                <p className="tile__text">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The sign-off. No attributed signature: "the Forge Capmoor team" would
            be a claim about who exists rather than about what the product does,
            and this page does not make those. The commitment is what matters,
            and a company can stand behind it without a name attached. */}
        <section className="page__section about__promise">
          <p className="eyebrow">Before you open an account</p>
          <h2 className="page__section-title">What we can and cannot promise</h2>

          <div className="promise__grid">
            <div className="promise promise--cannot">
              <h3 className="promise__title">Cannot promise</h3>
              <ul className="promise__list">
                <li className="promise__item">
                  <IconClose size={15} className="promise__icon" />
                  <span>
                    A return. Markets do not work that way, and a platform that says otherwise is
                    telling you about its marketing rather than its results.
                  </span>
                </li>
                <li className="promise__item">
                  <IconClose size={15} className="promise__icon" />
                  <span>
                    That you will not lose. You can lose some or all of the capital you commit.
                  </span>
                </li>
                <li className="promise__item">
                  <IconClose size={15} className="promise__icon" />
                  <span>
                    An outcome. What you get depends on the strategy, the amount you commit and
                    what the market does.
                  </span>
                </li>
              </ul>
            </div>

            <div className="promise promise--can">
              <h3 className="promise__title">Can promise</h3>
              <ul className="promise__list">
                <li className="promise__item">
                  <IconCheck size={15} className="promise__icon" />
                  <span>
                    A written reason behind every automated action, stored with the inputs it was
                    based on.
                  </span>
                </li>
                <li className="promise__item">
                  <IconCheck size={15} className="promise__icon" />
                  <span>
                    Risk disclosure published before you fund an account, and written to be read
                    rather than skimmed past.
                  </span>
                </li>
                <li className="promise__item">
                  <IconCheck size={15} className="promise__icon" />
                  <span>
                    Automation you can switch off at any time, without losing access to anything
                    else on the account.
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <p className="page__actions page__actions--start">
            <Link to="/signup" className="btn btn--primary">
              Create an account
              <IconArrowRight size={18} className="btn__icon" />
            </Link>
            <Link to="/risk-disclosure" className="btn btn--secondary">
              Read the risk disclosure
            </Link>
          </p>
        </section>
      </div>
    </article>
  )
}
