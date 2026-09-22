import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import {
  IconBolt,
  IconEye,
  IconGraph,
  IconLock,
  IconLoop,
  IconPattern,
  IconShield,
  IconSignal,
} from './Icons'

import './Capabilities.css'

/** Decorative: overlapping input rows, suggesting several sources folded into one view. */
function InputRowsViz() {
  const rows = [78, 54, 92, 40, 66]
  return (
    <div className="cap-viz cap-viz--rows" aria-hidden="true">
      {rows.map((width, index) => (
        <span key={width} className="cap-viz__row" style={{ '--w': `${width}%`, '--i': index }} />
      ))}
    </div>
  )
}

const CARDS = [
  {
    icon: IconSignal,
    title: 'Signal synthesis',
    text: 'Indicator families are combined into a single view, with every contributing input listed beside the result rather than collapsed into one number.',
    size: 'wide',
    viz: <InputRowsViz />,
  },
  {
    icon: IconPattern,
    title: 'Pattern detection',
    text: 'Recurring structures are identified across timeframes, and each match keeps the conditions that defined it.',
    size: 'single',
  },
  {
    icon: IconShield,
    title: 'Risk framing',
    text: 'Positions are placed against volatility and exposure context instead of being presented bare.',
    size: 'single',
  },
  {
    icon: IconBolt,
    title: 'Automated execution',
    text: 'Enable a strategy and the platform places trades on your account in line with it, recording why each one was taken. Pause it whenever you want. The change applies to trades not yet placed.',
    size: 'single',
  },
  {
    icon: IconEye,
    title: 'Explainable output',
    text: 'Every result carries a written rationale that cites the inputs behind it.',
    size: 'single',
  },
  {
    icon: IconLoop,
    title: 'Deposits and withdrawals',
    text: 'Funding and withdrawal run through the platform. The methods open to you, and the arrangements that apply, are shown before you commit, and withdrawals return the way the money came in.',
    size: 'single',
  },
  {
    icon: IconLock,
    title: 'Client funds custody',
    text: 'Money you deposit is held in a client money account, kept separate from Forge Capmoor’s own funds. Which institution holds it, and on what terms, is set out in the documents you receive when your account opens.',
    size: 'single',
  },
  {
    icon: IconGraph,
    title: 'Data integrity',
    text: 'Source freshness and completeness are tracked, so gaps are visible rather than silent.',
    size: 'single',
  },
]

/**
 * Capabilities as a bento grid.
 *
 * Cell sizes are deliberately unequal: one wide card and seven singles, so the
 * eye is given a route through the section instead of eight identical boxes.
 * The counts are load-bearing. On the three-column grid the wide card spans two
 * and the seven singles take the rest, filling exactly three rows; on the
 * two-column grid the wide card collapses to one column so all eight tile four
 * rows exactly. Adding or removing a card means re-checking that arithmetic
 * against Capabilities.css.
 *
 * A ninth, full-width "Scheduled analysis" banner used to close the grid. It
 * has been removed, which is why the arithmetic above is eight rather than
 * nine; ScheduleViz and its `.cap-viz--schedule` styles went with it.
 */
export function Capabilities() {
  return (
    <section
      id={SECTION_IDS.capabilities}
      className="section cap"
      aria-labelledby="cap-title"
    >
      <div className="container container--wide">
        <SectionHead
          eyebrow="Capabilities"
          id="cap-title"
          title="What the platform does, from data to execution"
          lead="What it reads, what it trades on, and where your money sits in between."
        />

        <div className="cap__grid">
          {CARDS.map((card, index) => {
            const Icon = card.icon
            return (
              <Reveal
                key={card.title}
                delay={(index % 3) * 80}
                className={`cap-card cap-card--${card.size}`}
              >
                <span className="cap-card__icon" aria-hidden="true">
                  <Icon size={22} />
                </span>

                <div className="cap-card__body">
                  <h3 className="cap-card__title">{card.title}</h3>
                  <p className="cap-card__text">{card.text}</p>
                </div>

                {card.viz}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Capabilities
