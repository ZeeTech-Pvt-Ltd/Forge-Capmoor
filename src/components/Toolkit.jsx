import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'
import { IconEye, IconGauge, IconLayers, IconLock, IconPattern, IconSignal } from './Icons'

import './Toolkit.css'

/**
 * What is actually in the product, as six tools.
 *
 * Content follows the reference's "Inside the Sovereign Kapitix Toolkit"
 * section, rephrased. Unlike the reference's statistics, almost all of this is
 * a description of a feature rather than a measurement, so it can be stated
 * without a figure behind it.
 *
 * The markets list used to be an unfilled token, because which markets a
 * platform covers is a fact about the business rather than about the software.
 * It has since been supplied, so the card states it directly.
 *
 * Secure custody deliberately points at the Security section above rather than
 * restating it — two sections making the same claim in different words reads
 * as padding.
 */
const TOOLS = [
  {
    icon: IconGauge,
    title: 'Charting',
    text: 'Live price data with drawing tools and an indicator library, so a view can be built and adjusted without leaving the platform.',
  },
  {
    icon: IconSignal,
    title: 'Signals as they form',
    text: 'Entry and exit signals surface as the conditions behind them are met, rather than in a summary after the move has happened.',
  },
  {
    icon: IconLayers,
    title: 'Everything in sync',
    text: 'Positions, watchlists and settings are held against the account rather than the device, so opening the platform somewhere else picks up where it left off.',
  },
  {
    icon: IconEye,
    title: 'Portfolio analytics',
    text: 'Performance, risk and allocation are shown together, so a position is always read against what else is open rather than on its own.',
  },
  {
    icon: IconPattern,
    title: 'Broad market coverage',
    text: 'Crypto, equities, forex, commodities and precious metals in one place, rather than spread across a separate app for each.',
  },
  {
    icon: IconLock,
    title: 'Custody and access',
    text: 'Client funds held in a segregated account, with two-factor authentication on logins and withdrawals. Set out in full in the Security section above.',
  },
]

/**
 * The toolkit grid.
 *
 * Six equal cards in a three-column grid: the Security row above it is also
 * three across, so this pairs with it rather than competing — and both sit
 * between the dark Technology band and the alternating Benefits rows, which is
 * where the page is between layouts anyway.
 */
export function Toolkit() {
  return (
    <section
      id={SECTION_IDS.toolkit}
      className="section section--surface toolkit"
      aria-labelledby="toolkit-title"
    >
      <div className="container container--wide">
        <SectionHead
          eyebrow="Inside the platform"
          id="toolkit-title"
          title="The tools you trade with"
          lead="Six parts of the product, and what each one is for."
        />

        <div className="toolkit__grid">
          {TOOLS.map((tool, index) => (
            <Reveal key={tool.title} className="toolkit__card" delay={index * 70}>
              <span className="toolkit__icon" aria-hidden="true">
                <tool.icon size={22} />
              </span>
              <h3 className="toolkit__card-title">{tool.title}</h3>
              <p className="toolkit__card-text">{tool.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Toolkit
