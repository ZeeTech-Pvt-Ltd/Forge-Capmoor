import './HighRiskWarning.css'

/**
 * The high risk warning, above the footer's legal line on every page.
 *
 * This is standard, expected wording for a site that offers leveraged
 * instruments, and it is the one block on the page written for someone who is
 * about to risk money rather than for someone browsing. It states the loss
 * case plainly and claims no regulatory status — see lib/legal.js.
 */
export function HighRiskWarning() {
  return (
    <section className="risk-band" aria-labelledby="risk-band-title">
      <h2 className="risk-band__title" id="risk-band-title">
        High risk warning
      </h2>

      <p className="risk-band__text">
        Trading foreign exchange, contracts for difference, cryptocurrencies and other financial
        instruments is highly speculative and carries a level of risk that will not suit every
        investor. You may lose some or all of the capital you commit, so you should not trade with
        money you cannot afford to lose.
      </p>

      <p className="risk-band__text">
        Any figures used to illustrate an outcome anywhere on this site are examples only and
        guarantee nothing. Forge Capmoor provides trading technology and execution services; it
        does not provide financial, investment or legal advice, and accepts no liability for loss
        or damage arising from reliance on anything published here.
      </p>

      <p className="risk-band__text">
        Laws governing financial activity differ from country to country and change over time. It
        is your responsibility to satisfy yourself that your use of this site complies with the law
        where you live.
      </p>
    </section>
  )
}

export default HighRiskWarning
