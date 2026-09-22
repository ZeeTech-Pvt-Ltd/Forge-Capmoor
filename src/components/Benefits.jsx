import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { IconCheck } from './Icons'

import './Benefits.css'

/**
 * Abstract section art, drawn rather than photographed.
 *
 * Each piece is a different shape so the three rows do not read as one
 * illustration repeated three times: a traced chain, a field of points, and
 * a column chart with a column missing.
 */

function TraceArt() {
  return (
    <svg viewBox="0 0 320 220" fill="none" aria-hidden="true" focusable="false">
      <line
        x1="40"
        y1="110"
        x2="280"
        y2="110"
        stroke="rgba(14,14,17,0.16)"
        strokeWidth="1.5"
        strokeDasharray="3 7"
        strokeLinecap="round"
      />
      {[40, 100, 220, 280].map((x) => (
        <circle key={x} cx={x} cy="110" r="8" fill="#fff" stroke="rgba(14,14,17,0.18)" strokeWidth="1.5" />
      ))}
      <circle cx="160" cy="110" r="27" stroke="#FF4B2B" strokeOpacity="0.26" strokeWidth="1.5" />
      <circle cx="160" cy="110" r="16" fill="#FF4B2B" fillOpacity="0.14" stroke="#FF4B2B" strokeWidth="1.5" />
      <circle cx="160" cy="110" r="5" fill="#FF4B2B" />
    </svg>
  )
}

function FocusArt() {
  const points = []
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      points.push({
        x: 52 + col * 43,
        y: 48 + row * 42,
        accent: (row === 1 && col === 1) || (row === 2 && col === 2) || (row === 3 && col === 3),
      })
    }
  }

  return (
    <svg viewBox="0 0 320 220" fill="none" aria-hidden="true" focusable="false">
      {points.map((point) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={point.accent ? 11 : 7}
          fill={point.accent ? '#FF4B2B' : 'rgba(14,14,17,0.12)'}
          fillOpacity={point.accent ? 0.16 : 1}
          stroke={point.accent ? '#FF4B2B' : 'none'}
          strokeWidth={point.accent ? 1.5 : 0}
        />
      ))}
      <circle cx="181" cy="132" r="4.5" fill="#FF4B2B" />
    </svg>
  )
}

function GapArt() {
  const bars = [
    { x: 46, h: 62 },
    { x: 90, h: 96 },
    { x: 178, h: 78 },
    { x: 222, h: 118 },
    { x: 266, h: 70 },
  ]

  return (
    <svg viewBox="0 0 320 220" fill="none" aria-hidden="true" focusable="false">
      <line x1="34" y1="172" x2="292" y2="172" stroke="rgba(14,14,17,0.14)" strokeWidth="1.5" />

      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={172 - bar.h}
          width="26"
          height={bar.h}
          rx="8"
          fill="#0E0E11"
          fillOpacity="0.1"
        />
      ))}

      {/* The missing column, drawn as an outline so the gap is the point. */}
      <rect
        x="134"
        y="60"
        width="26"
        height="112"
        rx="8"
        stroke="#FF4B2B"
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeDasharray="5 6"
      />
    </svg>
  )
}

const BENEFITS = [
  {
    art: <TraceArt />,
    title: 'Defend the call, not just make it',
    text: 'When someone asks why, the answer is already attached to the result: the inputs, the conditions that were met, and the caveats alongside them.',
    points: [
      'Every automated action is recorded with the inputs it was based on',
      'Signals arrive with their reasoning attached, not the outcome alone',
      'Pricing and risk are stated plainly rather than left to the fine print',
    ],
  },
  {
    art: <FocusArt />,
    title: 'Keep your attention for judgement',
    text: 'Assembly and scanning are routine work. Hand them to the platform and spend the hours you get back on the part that genuinely needs a person.',
    points: [
      'Market scanning runs continuously, so the routine pass is not one you have to run',
      'Execution can run hands-off while the account stays under your control',
      'Automation is a setting: pause it and trade manually whenever you want',
    ],
  },
  {
    art: <GapArt />,
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
              <div className="benefit__art">{benefit.art}</div>

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
