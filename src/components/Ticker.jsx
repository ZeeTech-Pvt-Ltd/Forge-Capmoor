import './Ticker.css'

/**
 * The market strip under the hero.
 *
 * The values are fixed examples, not a feed. Nothing on this site is connected
 * to a price source, so the strip carries a visible "Illustrative" label — a
 * moving row of prices reads as live data by default, and a ticker that is not
 * live has to say so rather than rely on the visitor assuming it.
 *
 * The symbols are the markets the platform states it covers (see the toolkit's
 * "Broad market coverage" card): crypto, forex, equities, commodities and
 * precious metals. No instrument is listed here that is not listed there.
 *
 * It is rendered twice — the second copy is `aria-hidden` and exists only so
 * the marquee can loop without a visible jump. Assistive technology reads the
 * list once.
 */
const INSTRUMENTS = [
  { symbol: 'BTC/USD', value: '67,432.21', change: '+2.38%', up: true },
  { symbol: 'ETH/USD', value: '3,245.17', change: '+3.12%', up: true },
  { symbol: 'SOL/USD', value: '142.63', change: '+4.21%', up: true },
  { symbol: 'EUR/USD', value: '1.0842', change: '-0.14%', up: false },
  { symbol: 'GBP/USD', value: '1.2713', change: '+0.09%', up: true },
  { symbol: 'AUD/USD', value: '0.6584', change: '-0.22%', up: false },
  { symbol: 'XAU/USD', value: '2,418.60', change: '+0.61%', up: true },
  { symbol: 'XAG/USD', value: '30.42', change: '+1.07%', up: true },
  { symbol: 'S&P 500', value: '5,487.03', change: '+0.35%', up: true },
  { symbol: 'NASDAQ', value: '17,862.44', change: '+0.72%', up: true },
  { symbol: 'WTI Crude', value: '78.19', change: '-0.48%', up: false },
]

function Row({ hidden }) {
  return (
    <ul className="ticker__row" aria-hidden={hidden || undefined}>
      {INSTRUMENTS.map((item) => (
        <li className="ticker__item" key={item.symbol}>
          <span className="ticker__symbol">{item.symbol}</span>
          <span className="ticker__value">{item.value}</span>
          <span className="ticker__change" data-up={item.up || undefined}>
            {item.change}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function Ticker() {
  return (
    <section className="ticker" aria-label="Markets covered by the platform">
      <p className="ticker__flag">Illustrative</p>

      <div className="ticker__viewport">
        <div className="ticker__track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  )
}

export default Ticker
