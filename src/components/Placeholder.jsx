import './Placeholder.css'

/**
 * Marks a value the site owner must supply before launch.
 *
 * Deliberately conspicuous: a monospace token on a tinted background, so it
 * cannot be mistaken for finished copy while reading the page. See
 * lib/legal.js for why these are not simply filled in.
 */
export function Placeholder({ children }) {
  return <span className="placeholder">{children}</span>
}

export default Placeholder
