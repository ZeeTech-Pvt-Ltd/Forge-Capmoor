import '../styles/pages.css'

/**
 * The head of an inner page: eyebrow, title, optional revision date, lead,
 * optional review note, optional actions.
 *
 * LegalPage and the 404 each used to hand-roll this markup. It lives in one
 * place now so every sub-page has the same rhythm — and so a change to the
 * spacing or the heading level happens once.
 *
 * `variant="prominent"` gives the block the warm wash and the display-sized
 * title that the homepage hero carries, for pages that open as a statement
 * rather than as a document. It is opt-in: legal pages and the 404 read better
 * flat, and a heading that shouts on a privacy policy is the wrong register.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  updated,
  actions,
  note,
  center = false,
  variant,
  titleId,
}) {
  return (
    <header
      className={[
        'page__head',
        center && 'page__head--center',
        variant === 'prominent' && 'page__head--prominent',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}

      <h1 className="page__title" id={titleId}>
        {title}
      </h1>

      {updated ? <p className="page__updated">Last updated {updated}</p> : null}

      {lead ? <p className="page__lead">{lead}</p> : null}

      {note ? (
        <div className="page__note">
          <p className="page__note-title">Before this is published</p>
          {note.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {actions ? <p className="page__actions">{actions}</p> : null}
    </header>
  )
}

export default PageHero
