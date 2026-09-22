import { PageHero } from './PageHero'

import '../styles/pages.css'

/**
 * Shared layout for the legal documents.
 *
 * Terms, Privacy and Risk Disclosure have the same shape — eyebrow, title,
 * revision date, intro, optional review note, then a run of headed clauses —
 * so they share one component and differ only in their content arrays.
 *
 * `numbered` gives the Risk Disclosure its 01–10 clause markers. `note` is the
 * review flag that has to appear on anything making a regulated claim.
 */
export function LegalPage({
  eyebrow = 'Legal',
  title,
  updated,
  intro,
  sections,
  numbered = false,
  note,
}) {
  return (
    <article className="section page">
      <div className="container container--narrow">
        <PageHero eyebrow={eyebrow} title={title} updated={updated} lead={intro} note={note} />

        <div className="legal__body">
          {sections.map((section, index) => (
            <section key={section.heading} className="legal__section">
              <h2 className="legal__heading">
                {numbered ? (
                  // Decorative: the heading text is the real label, so the
                  // number would only be noise read aloud.
                  <span className="legal__num" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                ) : null}
                {section.heading}
              </h2>

              {/* Index keys, not content keys: a paragraph can be a React node
                  rather than a string — the terms inline <Placeholder> tokens —
                  and a node has no usable string identity. These arrays are
                  static, so nothing reorders. */}
              {section.paragraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}

              {section.bullets ? (
                <ul className="legal__list">
                  {section.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}

export default LegalPage
