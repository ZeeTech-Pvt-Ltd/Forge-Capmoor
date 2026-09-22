import { useInView } from '../hooks/useInView'

/**
 * Fades and lifts its children the first time they enter the viewport.
 *
 * The hidden state is only ever applied by this component, after mount, and
 * `useInView` fails open — so a missing IntersectionObserver or a slow frame
 * shows the content rather than hiding it permanently.
 *
 * Stagger a group by passing an increasing `delay`; the value lands in a CSS
 * custom property so the transition itself stays in the stylesheet.
 */
export function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={['reveal', inView && 'is-visible', className].filter(Boolean).join(' ')}
      style={delay ? { '--reveal-delay': `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
