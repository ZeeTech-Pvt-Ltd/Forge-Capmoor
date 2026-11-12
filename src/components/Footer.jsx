import { Link } from '../lib/router'
import { FOOTER_COMPANY_LINKS, FOOTER_LEGAL_LINKS } from '../lib/navigation'
import { Logo } from './Icons'
import { HighRiskWarning } from './HighRiskWarning'

import './Footer.css'

const COLUMNS = [
  { title: 'Company', links: FOOTER_COMPANY_LINKS },
  { title: 'Legal', links: FOOTER_LEGAL_LINKS },
]

/**
 * Site footer.
 *
 * There are still no social links here, because there are still no Forge
 * Capmoor social accounts, and still no phone number — inventing either would
 * be worse than going without.
 *
 * The entity line is the one place every visitor passes through, so it is
 * where the regulatory identities live. They are placeholders rather than
 * guesses: a footer that prints a fabricated AFS Licence number is making a
 * false regulatory claim, not filling a gap. See lib/legal.js.
 */
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container container--wide">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__brand-link" aria-label="Forge Capmoor home">
              <Logo size={34} tone="dark" />
            </Link>

            <p className="footer__desc">
              Forge Capmoor turns market research into clear trade alerts, so every signal
              arrives with its entry, exit and reasoning attached.
            </p>

            <Link to="/signup" className="footer__cta">
              Create an account
            </Link>
          </div>

          <nav className="footer__nav" aria-label="Footer">
            {COLUMNS.map((column) => (
              <div key={column.title} className="footer__col">
                <h2 className="footer__col-title">{column.title}</h2>
                <ul className="footer__col-list">
                  {column.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="footer__link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <HighRiskWarning />

        <div className="footer__bottom">
          <div className="footer__legal">
            <p className="footer__note">
              Forge Capmoor provides trading signals and market research. It does not provide
              financial, investment or legal advice, and nothing on this site is a recommendation
              to buy or sell any financial instrument.
            </p>

          </div>

          <p className="footer__copy">© {year} Forge Capmoor</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
