import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { IconCheck } from './Icons'

import './Benefits.css'

const BENEFITS = [
  {
    image: {
      src: '/home-1-960.webp',
      srcSet: '/home-1-640.webp 640w, /home-1-960.webp 960w, /home-1-1200.webp 1200w',
      alt: 'A person wearing a headset beside panels marked Trade Call, Verified Signals, Risk Analysis and Real-Time Support, with a Bitcoin price chart alongside.',
    },
    title: 'Defend the call, not just make it',
    text: 'When someone asks why, the answer is already attached to the result: the inputs, the conditions that were met, and the caveats alongside them.',
    points: [
      'Every automated action is recorded with the inputs it was based on',
      'Signals arrive with their reasoning attached, not the outcome alone',
      'Pricing and risk are stated plainly rather than left to the fine print',
    ],
  },
  {
    image: {
      src: '/home-2-960.webp',
      srcSet: '/home-2-640.webp 640w, /home-2-960.webp 960w, /home-2-1200.webp 1200w',
      alt: 'A person at a laptop beside panels stepping through Analyze, Evaluate and Decide, with a Bitcoin chart and a circuit-board motif.',
    },
    title: 'Keep your attention for judgement',
    text: 'Assembly and scanning are routine work. Hand them to the platform and spend the hours you get back on the part that genuinely needs a person.',
    points: [
      'Market scanning runs continuously, so the routine pass is not one you have to run',
      'Execution can run hands-off while the account stays under your control',
      'Automation is a setting: pause it and trade manually whenever you want',
    ],
  },
  {
    image: {
      src: '/home-3-960.webp',
      srcSet: '/home-3-640.webp 640w, /home-3-960.webp 960w, /home-3-1200.webp 1200w',
      alt: 'A person at a trading desk facing several monitors, with panels marked Live Trading and Market Analysis and a list of market positions.',
    },
    title: 'See the gaps before they bite',
    text: 'Stale sources and missing data appear as part of the output, rather than surfacing weeks later as an unexplained hole in the numbers.',
    points: [
      'Risk is tracked alongside performance rather than after it',
      'Account activity is kept as a history you can go back through',
      'Withdrawals stay available, so nothing is locked away without you knowing',
    ],
  },
]

/**
 * Benefits as alternating rows.
 *
 * Deliberately not a card grid — the three points are a sequence, and giving
 * each one a full row with its own artwork gives the section a slower,
 * more considered rhythm than another set of boxes.
 */
export function Benefits() {
  return (
    <section className="section benefits" aria-labelledby="benefits-title">
      <div className="container container--wide">
        <SectionHead
          eyebrow="Benefits"
          id="benefits-title"
          title="What changes once every trade explains itself"
          lead="Three shifts that show up quickly once the reasoning travels with the trade."
        />

        <div className="benefits__rows">
          {BENEFITS.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              className={`benefit ${index % 2 === 1 ? 'benefit--flip' : ''}`}
            >
              <div className="benefit__art">
                {/* Supplied artwork, served as WebP at three widths with the
                    intrinsic size declared so the column reserves its space. */}
                <img
                  src={benefit.image.src}
                  srcSet={benefit.image.srcSet}
                  sizes="(max-width: 799px) 320px, 40vw"
                  width="1254"
                  height="1254"
                  loading="lazy"
                  decoding="async"
                  alt={benefit.image.alt}
                />
              </div>

              <div className="benefit__text">
                <span className="benefit__index" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="benefit__title">{benefit.title}</h3>
                <p className="benefit__body">{benefit.text}</p>

                <ul className="benefit__points">
                  {benefit.points.map((point) => (
                    <li key={point} className="benefit__point">
                      <IconCheck size={15} className="benefit__point-icon" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits
