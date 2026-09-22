/**
 * Country detection for the phone field's dial-code selector.
 *
 * Vercel resolves the visitor's country at the edge and hands it to the
 * function as a request header, so this reads a value the platform already
 * computed. Nothing is looked up, nothing is stored, and the visitor's IP never
 * leaves our own infrastructure — which is what keeps this consistent with the
 * privacy policy's statement that the site makes no third-party requests.
 *
 * The alternative, a public IP-geolocation API, would have meant shipping the
 * visitor's IP address to someone else for a convenience feature.
 *
 * Returns an empty string rather than a guess when the header is absent (this
 * is what local `vite preview` sees, and what a non-Vercel host would see).
 * The client treats empty as "no opinion" and keeps its own default, so there
 * is exactly one place that decides what the fallback country is.
 */
export const config = { runtime: 'edge' }

export default function handler(request) {
  const country = request.headers.get('x-vercel-ip-country') ?? ''

  return new Response(JSON.stringify({ country: country.toUpperCase() }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      // Per-visitor, so it must never be cached by a shared cache.
      'cache-control': 'no-store',
    },
  })
}
