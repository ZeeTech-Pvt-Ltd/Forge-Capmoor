import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { IconArrowRight, IconBolt, IconCheck, IconCompass, IconEye, IconLock, IconShield } from '../components/Icons'
import { ActArt, ChartArt, ContextArt, ReasoningArt } from '../components/TradingArt'

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
  useDocumentMeta({
    title: 'About us | Forge Capmoor',
    description:
      'What Forge Capmoor does, how it behaves, and the commitments behind an AI-assisted trading platform that keeps the reasoning attached to every automated action.',
    path: '/about',
  })

  return (
    <article className="section page">
      <div className="container">
        {/* Split hero: the copy on the left, the chart on the right. The chart
            is the page's one large drawing and it belongs beside the headline
            rather than under it — on its own it read as a figure the reader
            arrived at before knowing what they were looking at. */}
        <div className="about__hero">
          <div>
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

          <div className="about__hero-art">
            <ChartArt />
          </div>
        </div>

        <section className="page__section">
          <p className="eyebrow">Why we build it this way</p>
          <h2 className="page__section-title">Most automated trading is opaque by accident</h2>
          <div className="prose">
            <p>
              A position appears, the balance moves, and the reason is somewhere in a log you
              cannot read. That is not a limitation of automation. It is a choice about how much of
              it to show you, and most platforms choose to show as little as possible.
            </p>
            <p>
              We built Forge Capmoor the other way round. The record of why an action was taken is
              part of the product rather than a by-product of it, and it is written for the person
              whose money is at stake rather than for the engineer who wrote the rule.
            </p>
            <p>
              That has a cost. It means we publish what we can evidence and leave out what we
              cannot. It is why you will not find user counts, deposit totals, win rates or review
              scores anywhere on this site, not because the numbers would be unflattering, but
              because a figure printed for its effect is worth less than nothing to someone
              deciding whether to fund an account.
            </p>
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

          <ol className="steps">
            {VALUES.map((value, index) => (
              <li key={value.title} className="steps__item">
                <span className="steps__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="steps__title">{value.title}</h3>
                  <p className="steps__text">{value.text}</p>
                </div>
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
        <div className="about__closing">
          <h2 className="page__section-title">What we can and cannot promise</h2>
          <p className="about__closing-lead">
            We cannot promise returns. Markets do not work that way, and a platform that says
            otherwise is telling you something about its marketing rather than about its results.
            What we can promise is narrower and worth more: a written reason behind every automated
            action, risk disclosure written to be read, and the ability to switch automation off
            whenever you want.
          </p>

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
    </article>
  )
}
