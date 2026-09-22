import { COUNTRIES } from './countries'

/**
 * Detected country, or null when there is nothing trustworthy to go on.
 *
 * Cached at module scope, so it is one request per page load no matter how many
 * forms are on it — the homepage and /signup both mount SignUpForm, and without
 * this each would ask separately.
 *
 * Every failure path returns null rather than a guess: the endpoint missing
 * (`vite preview`, a non-Vercel host), a network error, a non-JSON body — which
 * is what the SPA fallback rewrite would return if the function were ever
 * shadowed — or a country the selector does not offer. The caller keeps its own
 * default in that case, so there is one place that decides the fallback.
 */
let pending = null

/**
 * The endpoint is a Vercel function, so there is nothing to ask on a local
 * machine — `vite preview` answers with the SPA fallback, i.e. a 404 or an HTML
 * body, and either way the browser logs a failed request for a feature that was
 * never going to work locally. Skipping the call keeps a developer's console
 * clean, and the result is the same default they would have got anyway.
 */
function canDetect() {
  if (typeof location === 'undefined') return false
  const host = location.hostname
  return host !== 'localhost' && host !== '127.0.0.1' && host !== '::1' && !host.endsWith('.local')
}

export function detectCountry() {
  if (pending) return pending

  if (!canDetect()) {
    pending = Promise.resolve(null)
    return pending
  }

  pending = fetch('/api/geo', { headers: { accept: 'application/json' } })
    .then((response) => {
      if (!response.ok) return null
      if (!response.headers.get('content-type')?.includes('application/json')) return null
      return response.json()
    })
    .then((data) => {
      const code = String(data?.country ?? '').toLowerCase()
      return COUNTRIES.some((country) => country.code === code) ? code : null
    })
    .catch(() => null)

  return pending
}
