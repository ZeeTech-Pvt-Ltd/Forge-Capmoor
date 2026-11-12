import { Reveal } from './Reveal'
import { SectionHead } from './SectionHead'
import { SECTION_IDS } from '../lib/navigation'

import './DataDomains.css'

/* --------------------------------------------------------------------------
   Decorative charts.

   Every one of these is abstract artwork. None of them plots a real series,
   and none of them is labelled with a figure - they give the four markets a
   visual language, not a measurement.
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

const MARKETS = [
  {
    chart: <PriceChart />,
    title: 'Crypto',
    text: 'Trade ideas on top digital assets such as Bitcoin and Ethereum.',
  },
  {
    chart: <MomentumChart />,
    title: 'Forex',
    text: 'Signals on heavily traded pairs built around USD, EUR and GBP.',
  },
  {
    chart: <VolatilityChart />,
    title: 'Stocks',
    text: 'Setups on shares of major companies worldwide.',
  },
  {
    chart: <LiquidityChart />,
    title: 'Commodities',
    text: 'Alerts on price swings in gold, silver and oil.',
  },
]

export function DataDomains() {
  return (
    <section
      id={SECTION_IDS.domains}
      className="section section--surface domains"
      aria-labelledby="domains-title"
    >
      <div className="container container--wide">
        <SectionHead id="domains-title" title="Markets" />

        <ul className="domains__grid">
          {MARKETS.map((market, index) => (
            <Reveal as="li" key={market.title} delay={(index % 3) * 80} className="domain">
              <span className="domain__chart" aria-hidden="true">
                {market.chart}
              </span>
              <h3 className="domain__title">{market.title}</h3>
              <p className="domain__text">{market.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default DataDomains
