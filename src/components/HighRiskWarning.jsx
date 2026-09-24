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
        Trading forex, CFDs, crypto and similar instruments is highly speculative, and you may lose
        all you commit. Figures here are examples only, and nothing on this site is financial,
        investment or legal advice. Laws differ by country. Complying with the law where you live
        is your responsibility.
      </p>
    </section>
  )
}

export default HighRiskWarning
