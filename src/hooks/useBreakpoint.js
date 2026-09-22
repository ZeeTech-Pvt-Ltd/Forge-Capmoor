import { useMediaQuery } from './useMediaQuery'

/**
 * Three-tier breakpoint used by the hero network.
 *
 * The network is genuinely a different composition at each tier — not a
 * scaled version of the desktop one — so components switch on this value
 * rather than relying on CSS alone.
 *
 *   mobile  < 768px   compact chips, short labels
 *   tablet  768–1119  four cards, no chips
 *   desktop >= 1120px full network with node chips
 *
 * `useMediaQuery` seeds from matchMedia synchronously, so the first paint is
 * already the right composition.
 */
export function useBreakpoint() {
  const isDesktop = useMediaQuery('(min-width: 1120px)')
  const isTablet = useMediaQuery('(min-width: 768px)')

  if (isDesktop) return 'desktop'
  if (isTablet) return 'tablet'
  return 'mobile'
}
