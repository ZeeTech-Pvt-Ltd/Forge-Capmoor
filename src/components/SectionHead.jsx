import { Reveal } from './Reveal'

/**
 * The heading block that opens a section.
 *
 * Keeping this in one place is what stops every section from inventing its
 * own eyebrow/title/lead spacing — and it guarantees the document outline
 * stays a clean h2-per-section with h3s inside.
 *
 * `align="center"` is used where a section reads best as one balanced block;
 * `align="start"` where the heading pairs with a visual beside it. Sections
 * deliberately alternate between the two.
 */
export function SectionHead({ eyebrow, title, lead, align = 'center', id, className = '' }) {
  return (
    <Reveal
      className={[
        'section-head',
        align === 'center' && 'section-head--center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="section-title" id={id}>
        {title}
      </h2>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </Reveal>
  )
}

export default SectionHead
