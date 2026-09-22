import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'

import './DataDomains.css'

/* --------------------------------------------------------------------------
   Decorative charts.

   Every one of these is abstract artwork. None of them plots a real series,
   and none of them is labelled with a figure — they exist to give the six
   domains a visual language, not to imply a measurement.
   -------------------------------------------------------------------------- */

function PriceChart() {
  const candles = [
    { x: 12, wickTop: 12, wickBottom: 46, bodyTop: 20, bodyBottom: 38 },
    { x: 34, wickTop: 8, wickBottom: 40, bodyTop: 14, bodyBottom: 30 },
    { x: 56, wickTop: 18, wickBottom: 50, bodyTop: 26, bodyBottom: 45, accent: true },
    { x: 78, wickTop: 10, wickBottom: 38, bodyTop: 16, bodyBottom: 32 },
    { x: 100, wickTop: 6, wickBottom: 34, bodyTop: 11, bodyBottom: 26 },
  ]

  return (
    <svg viewBox="0 0 120 56" fill="none" aria-hidden="true" focusable="false">
      {candles.map((candle) => (
        <g key={candle.x}>
          <rect
            x={candle.x + 4.5}
            y={candle.wickTop}
            width="1.4"
            height={candle.wickBottom - candle.wickTop}
            rx="0.7"
            fill={candle.accent ? '#FF4B2B' : 'rgba(14,14,17,0.24)'}
          />
          <rect
            x={candle.x}
            y={candle.bodyTop}
            width="10.5"
            height={candle.bodyBottom - candle.bodyTop}
            rx="2.5"
            fill={candle.accent ? '#FF4B2B' : 'rgba(14,14,17,0.13)'}
          />
        </g>
      ))}
    </svg>
  )
}

function MomentumChart() {
  return (
    <svg viewBox="0 0 120 56" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="domain-momentum" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FF4B2B" stopOpacity="0.24" />
          <stop offset="1" stopColor="#FF4B2B" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M6 42 26 33 46 37 66 21 86 26 114 9V56H6z" fill="url(#domain-momentum)" />
      <path
        d="M6 42 26 33 46 37 66 21 86 26 114 9"
        stroke="#FF4B2B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function VolatilityChart() {
  return (
    <svg viewBox="0 0 120 56" fill="none" aria-hidden="true" focusable="false">
      <path
        d="M6 26C22 10 34 40 52 22s24 14 62-10v22C76 52 60 34 44 44S18 42 6 48z"
        fill="#FF4B2B"
        fillOpacity="0.12"
      />
      <path
        d="M6 26C22 10 34 40 52 22s24 14 62-10"
        stroke="#FF4B2B"
        strokeOpacity="0.7"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M6 48C18 42 28 44 44 44s22 8 70-22"
        stroke="#FF4B2B"
        strokeOpacity="0.34"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  )
}

function LiquidityChart() {
  const rows = [
    { y: 6, width: 92 },
    { y: 18, width: 68 },
    { y: 30, width: 104 },
    { y: 42, width: 50 },
  ]

  return (
    <svg viewBox="0 0 120 56" fill="none" aria-hidden="true" focusable="false">
      {rows.map((row, index) => (
        <rect
          key={row.y}
          x={114 - row.width}
          y={row.y}
          width={row.width}
          height="8"
          rx="4"
          fill={index === 1 ? '#FF4B2B' : 'rgba(14,14,17,0.13)'}
          fillOpacity={index === 1 ? 0.85 : 1}
        />
      ))}
    </svg>
  )
}

function CorrelationChart() {
  const cells = []
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      const distance = Math.abs(row - 1.5) + Math.abs(col - 2.5)
      cells.push({ row, col, opacity: Math.max(0.08, 0.62 - distance * 0.11) })
    }
  }

  return (
    <svg viewBox="0 0 120 56" fill="none" aria-hidden="true" focusable="false">
      {cells.map((cell) => (
        <rect
          key={`${cell.row}-${cell.col}`}
          x={4 + cell.col * 19}
          y={4 + cell.row * 12.5}
          width="15"
          height="9"
          rx="2.5"
          fill="#FF4B2B"
          fillOpacity={cell.opacity}
        />
      ))}
    </svg>
  )
}

function SentimentChart() {
  const bars = [22, 34, 15, 40, 26, 12, 30]
  const midline = 28

  return (
    <svg viewBox="0 0 120 56" fill="none" aria-hidden="true" focusable="false">
      <line x1="4" y1={midline} x2="116" y2={midline} stroke="rgba(14,14,17,0.16)" strokeWidth="1" />
      {bars.map((height, index) => {
        const up = index % 2 === 0
        return (
          <rect
            key={index}
            x={8 + index * 16}
            y={up ? midline - height : midline}
            width="9"
            height={height}
            rx="3"
            fill={index === 3 ? '#FF4B2B' : 'rgba(14,14,17,0.2)'}
          />
        )
      })}
    </svg>
  )
}

const DOMAINS = [
  {
    chart: <PriceChart />,
    title: 'Price structure',
    text: 'Session ranges, established levels and the shape price has carved out over time.',
  },
  {
    chart: <MomentumChart />,
    title: 'Momentum',
    text: 'The rate and persistence of movement, measured across several lookbacks rather than one.',
  },
  {
    chart: <VolatilityChart />,
    title: 'Volatility',
    text: 'How much the market is moving, read against its own recent history instead of an absolute threshold.',
  },
  {
    chart: <LiquidityChart />,
    title: 'Liquidity',
    text: 'Where participation is concentrated, and how readily the market absorbs size.',
  },
  {
    chart: <CorrelationChart />,
    title: 'Correlation',
    text: 'Which instruments are moving together, and when those relationships start to break down.',
  },
  {
    chart: <SentimentChart />,
    title: 'Sentiment',
    text: 'Positioning and commentary-derived measures, held separately from the price data.',
  },
]

/**
 * The section that would normally be a wall of performance statistics.
 *
 * We do not publish performance figures, and inventing them — as this market
 * routinely does — is not something we are willing to do. So the visual weight
 * that a stats band would carry is given to the taxonomy of inputs the
 * platform actually reads, with an explicit note saying exactly that.
 */
export function DataDomains() {
  return (
    <section
      id={SECTION_IDS.domains}
      className="section section--surface domains"
      aria-labelledby="domains-title"
    >
      <div className="container container--wide">
        <SectionHead
          eyebrow="Data domains"
          id="domains-title"
          title="Six kinds of market data, cross-referenced"
          lead="Forge Capmoor works across the categories below, keeping each source’s provenance intact so any finding can be traced back to what produced it."
        />

        <ul className="domains__grid">
          {DOMAINS.map((domain, index) => (
            <Reveal as="li" key={domain.title} delay={(index % 3) * 80} className="domain">
              <span className="domain__chart" aria-hidden="true">
                {domain.chart}
              </span>
              <h3 className="domain__title">{domain.title}</h3>
              <p className="domain__text">{domain.text}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal as="p" className="domains__note">
          These entries describe the categories of input the platform reads. There are no
          performance figures anywhere on this site, because a return depends on the strategy
          you choose, the amount you commit, how long you stay in and what the market did over
          that period. A single number would tell you nothing about what you would experience,
          and we would rather publish none than publish one that reads like a promise.
        </Reveal>
      </div>
    </section>
  )
}

export default DataDomains
