# Forge Capmoor — final QA report

Target: `https://forge-capmoor.net/`
Stack: React 19 + Vite 6, hand-authored CSS3, no CSS framework, no runtime
dependency beyond React.
Report date: 21 September 2026
Last updated: 21 September 2026 — **page expansion and reposition.** The site
was extended from 4 routes to 10, the header and footer were repointed at real
pages instead of homepage anchors, and the product described was changed from
an *analysis workspace* to an **AI trading platform**. §1–§6 describe the
current state; §9 records what changed in this pass and how it was verified.

---

## 1. Files created and modified

**Configuration / root**
| File | Purpose |
| --- | --- |
| `package.json` | Scripts: `dev`, `build`, `preview`, `images`. Deps: react, react-dom. Dev: vite, @vitejs/plugin-react, sharp |
| `vite.config.js` | `target: es2020`, `cssCodeSplit`, `assetsInlineLimit: 4096`, React split into its own chunk |
| `index.html` | Technical SEO shell, inline critical CSS, font preloads, static JSON-LD |
| `.env.example` | Documents `VITE_CONTACT_ENDPOINT` |
| `vercel.json` | SPA rewrite + immutable cache headers for `/assets` and `/fonts`, plus security headers |
| `scripts/generate-images.mjs` | Rasterises `og-image.svg` → `og-image.png` (1200×630) and the Apple touch icon (180×180) |
| `QA-REPORT.md` | This file |

**`public/`** — `robots.txt`, `sitemap.xml` (8 URLs), `site.webmanifest`,
`favicon.svg`, `og-image.svg` + `og-image.png`, `apple-touch-icon.png`,
`_redirects`, `fonts/bricolage-grotesque-latin.woff2`,
`fonts/plus-jakarta-sans-latin.woff2`

**`src/`** — 60 files
- `styles/` — `tokens.css` (every colour, size, radius, timing, plus the
  `--field-*` and `--placeholder-*` token sets), `base.css` (reset, layout
  primitives, buttons, cards, reveal), `fonts.css`, `pages.css`
- `lib/` — `router.jsx` (custom History-API router, ~80 lines), `navigation.js`,
  `faq.js`, `heroNetwork.js` (hero geometry for three compositions), `legal.js`
  (the placeholder tokens and the lawyer-review note)
- `hooks/` — `useInView`, `useMediaQuery`, `useBreakpoint`, `useScrolled`,
  `useDocumentMeta`
- `components/` — Header, Hero, HeroBackdrop, NetworkSvg, HeroHub,
  HeroFloatingCard, Principles, Proposition, HowItWorks, Capabilities,
  Technology, Benefits, DataDomains, WhyForge, FaqAccordion, FaqTeaser,
  FinalCTA, Footer, HighRiskWarning, PageHero, LegalPage, Placeholder,
  SignUpForm, Reveal, SectionHead, Icons (+ a co-located `.css` per visual
  component). `HeroNetwork` was removed in §10 — the network is the hero's own
  background layer now, not a separate stage.
- `pages/` — `Home`, `About`, `Faq`, `Contact`, `SignUp`, `RiskDisclosure`,
  `ThankYou`, `Privacy`, `Terms`, `NotFound` (all but `Home` behind
  `React.lazy`)
- `App.jsx`, `main.jsx`

**Deliberately absent:** any icon library, animation library, component
library, CSS framework, or router package.

---

## 2. Final page structure

### 2a. Routes

| Route | Page | Indexable | Canonical |
| --- | --- | --- | --- |
| `/` | Home | yes | `https://forge-capmoor.net/` |
| `/about` | About us | yes | `…/about` |
| `/faq` | FAQ | yes | `…/faq` |
| `/signup` | Sign up | yes | `…/signup` |
| `/contact` | Contact | yes | `…/contact` |
| `/risk-disclosure` | Risk disclosure | yes | `…/risk-disclosure` |
| `/privacy` | Privacy policy | yes | `…/privacy` |
| `/terms` | Terms of use | yes | `…/terms` |
| `/thank-you` | Thank you | **no** | none |
| any other path | 404 | **no** | none |

### 2b. Homepage sections

Eleven sections after the hero, in an order chosen so no two adjacent sections
share a layout:

| # | Section | Layout / background |
| --- | --- | --- |
| — | Header | Fixed; becomes a floating pill after 8px of scroll |
| 1 | Hero | Light. Centred H1 → lead → CTA → interactive network visual |
| 2 | Principles | Four commitments on a hairline rail (replaces invented partner logos) |
| 3 | Proposition | Asymmetric split: text + checks left, vertical 3-stage rail right |
| 4 | How it works | Surface background, centred head, 3-step horizontal track |
| 5 | Capabilities | Bento grid — 9 cards, one wide / seven single / one full-width |
| 6 | Technology | Full-bleed dark band, provenance SVG diagram |
| 7 | Benefits | Three alternating full-width rows with abstract SVG art |
| 8 | Data domains | Six tiles, each with its own decorative chart |
| 9 | Why Forge Capmoor | Two columns, heading sticky on desktop |
| 10 | FAQ teaser | Native `<details>` accordion, first 3 of 10 questions, link to `/faq` |
| 11 | Final CTA | Dark band with the shared, validated account form |
| — | Footer | `--dark-deep`, 4 columns, high-risk warning band, entity line |

Hero H1: *"AI market intelligence that shows its reasoning, not just its
signals."* — one `<h1>` on the page, 13 `<h2>`s.

**Visual language:** off-white canvas, near-black ink, a single warm accent
(`#FF4B2B`), hairline rules, generous whitespace, bento and asymmetric grids,
soft-touch borders and shallow shadows. No stock photography — every graphic
is inline SVG or CSS.

---

## 3. SEO implementation

- **Title** (57 chars): `Forge Capmoor | AI Trading Platform That Explains Itself`
- **Meta description** (144 chars), written for the search result, not the page
- **Canonical**: built from a hardcoded `SITE_ORIGIN` in `useDocumentMeta`,
  never `window.location.origin`. This is what prevents canonicalisation to
  localhost, a Vercel preview URL, or `forgecapmoor.net`. **Verified per route**
  across all 10: each indexable page resolves to `https://forge-capmoor.net<path>`;
  `/thank-you` and the 404 emit **no** canonical at all.
- **Robots**: `index, follow, max-image-preview:large, max-snippet:-1`;
  `/thank-you` and the 404 set `noindex, follow`
- **Semantic HTML**: `header` / `main#main` / `nav` / `section` / `footer`,
  exactly one `<h1>` per route, no heading-level skips (verified
  programmatically across all 10 routes)
- **Structured data** — two blocks:
  - Static `@graph` in `index.html`: `Organization` + `WebSite`
  - `FAQPage` with all 10 questions, emitted **on `/faq` only** and **generated
    from the same array the accordion renders**, so schema and visible content
    cannot drift. The homepage FAQ teaser renders the same component but emits
    no schema — two URLs carrying the same `FAQPage` would be duplicate
    structured data. Verified: the schema's question list matches the rendered
    list exactly, and no other route emits one.
- **Open Graph + Twitter**: `summary_large_image`, complete set, absolute URLs
  pointing at the generated 1200×630 `og-image.png`
- **`robots.txt`** and **`sitemap.xml`** (8 URLs, absolute, `lastmod` set —
  `/thank-you` is deliberately excluded, since listing a `noindex` URL in the
  sitemap contradicts its own robots directive)
- **Web manifest**, SVG favicon, Apple touch icon, `theme-color`
- **Internal linking**: every link on the site points at a real route —
  **zero `/#section` hrefs remain anywhere in the rendered page** (asserted
  programmatically). The hero's "See how it works" cue was the last one and has
  since been removed (see §10), so there are now no in-page anchors at all.
  `SECTION_IDS` still exists, but only as the source of the homepage sections'
  own `id` attributes for their `aria-labelledby` wiring; nothing links to them.
- **Keyword use**: "AI trading platform", "AI market intelligence", "automated
  execution", "pattern detection", "risk disclosure" — in the H1, section
  headings, body, FAQ and image alt text, at natural density, not stuffed

---

## 4. Performance optimisations

Measured, not assumed — see §6a for the exact configuration.

- **Self-hosted variable WOFF2**, latin subset only. No Google Fonts request
  at runtime and no render-blocking third-party stylesheet. Both files are
  `<link rel="preload" crossorigin>`ed, so the H1 usually paints in Bricolage
  on the first frame instead of swapping.
- **No images on the page.** Zero `<img>` elements; every visual is inline SVG
  or CSS. Total page weight is 198 KiB.
- **No unnecessary dependencies.** 84 KB gzip of JS (React + the whole site)
  and 8 KB gzip of CSS. No animation, icon, component or router library.
- **Code splitting**: `/privacy`, `/terms` and the 404 are `React.lazy` +
  `Suspense`; the homepage is eager so its content is never deferred.
- **The hero is not lazy-loaded and nothing below the fold blocks it** — the
  headline is in the initial markup and paints as soon as the stylesheet lands.
  ⚠️ **Corrected in §10:** the H1 is *not* the LCP element in practice, because
  the `hero-rise` entrance animation holds it at `opacity: 0` past first paint
  and Chrome then never counts it. The LCP element is the header wordmark. The
  page is not slower for it; the metric simply stops describing the page.
- **Hero uses SVG, not raster** — no hero image to download or decode.
- **CLS is 0.** Layout-shift observers recorded no shifts at all: fonts are
  preloaded, and nothing below-the-fold is injected into the initial layout.
  (The hero network's `aspect-ratio` was replaced in §10 by a `min-height` floor,
  since the network now stretches to the hero box; CLS is still 0.)
- **One `IntersectionObserver` for the whole page.** The first implementation
  created one observer and one timer per `Reveal` — 54 of each on the homepage.
  Consolidating them cut total blocking time from 380 ms to 60 ms.
- **No blanket `will-change`.** The initial `.reveal` rule promoted all 54
  reveals to their own compositor layers, which cost more than it saved.
  Removing it was the single largest performance win.
- **`backdrop-filter` on the header is gated behind `[data-scrolled]`**, so it
  costs nothing on load.
- **Below-the-fold images**: none exist to lazy-load.

---

## 5. Accessibility improvements

Lighthouse Accessibility: **100** in every run.

- Semantic landmarks; one `h1`; no heading-level skips (verified)
- Skip-to-content link as the first focusable element
- **Every interactive element is a real `<button>` or `<a href>`** — no `div`
  standing in for a control. Verified: zero `role="button"` on non-buttons,
  zero links without `href`, zero unnamed buttons or links.
- Visible `:focus-visible` outline on every focusable element
- **Contrast**: every pairing audited programmatically against WCAG 2.1 across
  the rendered page. Six genuine failures were found and fixed — `--text-3`
  (3.5:1) and `--on-dark-3` (4.0:1) were raised to 5.0:1 and 5.3:1, and the
  dark Technology band's heading, which was rendering near-black on near-black,
  was fixed at the stylesheet level so any future dark section is safe. The
  remaining three flagged nodes are inside the decorative hero, where the
  auditor cannot read gradient backgrounds; they were verified legible by
  inspecting the rendered pixels directly.
- The primary CTA uses ink text on the accent fill (6.3:1) rather than white
  (3.3:1, which would fail) — a deliberate, documented brand decision
- **Mobile drawer**: focus moves into the panel on open, Tab is trapped inside,
  Escape closes it, and focus returns to the trigger. All four verified. Two
  real bugs were found and fixed here — Escape was not returning focus, and the
  panel transitioned `visibility` over 380 ms, leaving it unfocusable for the
  opening frames.
- **FAQ uses native `<details>`/`<summary>`** — keyboard operable and
  screen-reader announced before any script runs, and it still works if the
  bundle fails to load.
- Form fields are properly labelled via `useId`-scoped `for`/`id` pairs, with
  `aria-invalid` and `aria-describedby` wired to inline errors
- Status messages use `role="status" aria-live="polite"`
- Decorative SVG is `aria-hidden`; the one meaningful graphic is described in
  text elsewhere on the page
- **`prefers-reduced-motion` is honoured throughout** — durations collapse,
  the hero entrance, hub float and node drift are all disabled, and reveals
  resolve instantly

---

## 6. Responsive testing results

Tested in headless Chromium at **320, 375, 390, 414, 768, 1024, 1280, 1440 and
1920px**:

- **No horizontal overflow at any width.** `documentElement.scrollWidth` equals
  `clientWidth` at all nine. A DOM sweep for elements extending past the
  viewport returned **0 offenders** at every width.
- One `h1` and 13 `h2`s at every width; zero console errors or warnings and
  zero failed requests at every width.
- **The hero is three distinct compositions, not one scaled drawing**, verified
  by reading the rendered `viewBox`:
  - 320–414px → `0 0 400 520`, 4 compact single-word chips, hub centred
  - 768–1024px → `0 0 900 580`, 4 cards
  - 1280px+ → `0 0 1200 560`, 6 nodes
- Card typography scales with the stage via container queries (`cqw`) with
  plain-px fallbacks declared first
- Mobile is not a narrowed desktop: the bento grid collapses to a single
  column, the 4-step track becomes a left-aligned vertical list, the sticky
  heading reverts to static, and the drawer replaces the desktop nav
- Anchors land clear of the fixed header (sections resolve to 90–101px, header
  is 74px)

### 6a. Lighthouse (actually run)

Lighthouse **12.8.2**, default **mobile emulation** (Moto G Power, 4× CPU
throttle, slow 4G), against the local production `vite preview` build.
Two consecutive runs, because single Lighthouse scores vary:

Re-run after the page expansion, same configuration:

| Route | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` (run 1) | **96** | **100** | **100** | **100** |
| `/` (run 2) | **95** | — | — | — |
| `/signup` | **90** | **100** | **100** | **100** |

Metrics — `/`: FCP 1.4 s · LCP 2.2 s · **TBT 170–210 ms** · **CLS 0** ·
Speed Index 2.1 s · 202 KiB · 709 DOM elements.
`/signup`: FCP 1.8 s · LCP 2.5 s · TBT 230 ms · CLS 0. It is slightly slower
because it is a lazily-loaded chunk, so there is one extra request before its
content can paint.

**No category has a failing audit.** Accessibility 100 covers axe's
`color-contrast` check, so the contrast audit is Lighthouse's own, not a
hand-rolled calculation.

An outlier run scored Performance **72** with TBT 990 ms. That run overlapped a
second `vite build` + preview on the same machine; repeat runs under load-free
conditions returned 95–96. Reported here because a discarded number is worth
more than a hidden one — but it is measurement contention, not a page
regression, and the earlier baseline in this report was also taken under
lighter load.

**Caveat:** this is a local preview server, not the production CDN, and it is
Lighthouse rather than PageSpeed Insights. Scores on the live domain will
differ — network conditions and host headers are not reproduced here.

These figures were taken before the hero was rebuilt; §10 has a later run taken
under heavy machine load, with the reason for the difference stated there.

---

## 7. Remaining issues

**Must be resolved before launch**

1. **Seven placeholder values are still unfilled.** They are deliberately
   conspicuous on the rendered page — a monospace token on a tinted background —
   so they cannot ship unnoticed. All seven live in `src/lib/legal.js`:

   | Token | Needed for | Appears on |
   | --- | --- | --- |
   | `[LEGAL ENTITY NAME]` | the operating company's registered name | Terms §02, footer |
   | `[AFSL NUMBER]` | Australian Financial Services Licence number | Terms §02, footer |
   | `[ABN / ACN]` | company registration number | Terms §02, footer |
   | `[STATE OR TERRITORY]` | governing jurisdiction for disputes | Terms §16 |
   | `[SUPPORT EMAIL]` | the address enquiries go to | Contact, footer |
   | `[REGISTERED OFFICE]` | registered office address | Terms §02, Contact |
   | `[SUPPORT HOURS]` | support hours | Contact |

   **Why these are placeholders and not filled in.** Automated trading, client
   deposits and withdrawals, and client funds held in custody are, in Australia,
   activities requiring an AFS Licence, client money held in a designated trust
   account with an Australian ADI (ASIC RG 212), and AUSTRAC AML/CTF
   registration. A fabricated licence number on a public site is a false
   regulatory claim, not a missing detail. The site instead says out loud, in
   the place a regulator would look, that the regulated details are pending.

2. **The three legal documents need review by a qualified Australian legal
   practitioner** before they are relied on or published. Each carries a visible
   "Before this is published" note saying so — that note must be removed once
   the review is done, not left in place.
3. **The reference site's figures are deliberately absent.** It publishes a
   comparison table, a stats row and a live-looking portfolio widget, and every
   cell in them is a number for *that* business: 85% signal accuracy, 98% of
   funds in cold storage, 300+ markets, AU$250 minimum deposit, a 4.7/5 trader
   rating. None of it was copied. The "At a glance" table built from those rows
   has since been removed entirely, and the markets list it queried is now
   stated directly on the toolkit's "Broad market coverage" card, so no
   placeholder tokens remain outside the legal pages.

   If that table comes back, two of its rows need care before they are filled
   in: a signal-accuracy percentage is a performance claim that needs a
   measurement behind it, over a stated period and a stated set of signals, and
   a minimum deposit is a term of business a visitor can hold the platform to
   once it is published.

4. **The account form has no backend.** `VITE_CONTACT_ENDPOINT` is unset. The
   form renders, validates and reports errors correctly, but on submit it tells
   the visitor plainly that nothing was sent, and it does **not** redirect to
   `/thank-you`. This is intentional — a fake success would be worse — but it
   must be configured before launch. See `.env.example`.

   Both branches were verified with real builds: with the variable set, a 2xx
   navigates to `/thank-you` with the payload
   `{firstName, lastName, email, phone, source}`, and a 5xx does **not**
   redirect and shows an error instead. With it unset, neither happens.
5. **A real 404 status code needs host configuration.** As an SPA, a missing
   path returns HTTP 200 with a `noindex` page. `vercel.json` and
   `public/_redirects` are included for client routing; a true 404 status needs
   a host-level rule or a prerender step.

**Known limitations**

6. **The page is client-rendered.** First paint depends on the JS bundle
   executing. Everything crawlers need is present in `index.html` (title,
   description, canonical, OG, `Organization`/`WebSite` schema), but the
   `FAQPage` schema and body content require JS execution. Googlebot handles
   this; a prerender step would remove the dependency entirely.
6. **`og-image.svg` ships in `dist`.** Harmless, and it documents the source
   artwork, but it is publicly fetchable if that is unwanted.
7. **The reveal safety net fires at 2.5 s.** If a visitor does not scroll for
   2.5 s, all sections become visible at once and the scroll-reveal animation
   is skipped for the rest of the page. This is the deliberate trade — content
   visibility is guaranteed, animation is not. Verified working in both
   directions.
8. **Nothing on the site states the instruments tradable or the funding methods
   accepted.** The reference site carries a compact capability table covering
   both. It is deliberately omitted here: two of its seven rows would have had
   to be placeholders on the homepage, and a marketing surface that is a third
   bracketed text reads as unfinished rather than honest. The three capabilities
   it was meant to carry — automated execution, deposits and withdrawals, client
   funds custody — are present as full capability cards instead. **If you want
   the table, supply the two values and it can be added.**
9. **The hero entrance animation hides the LCP element from the metric.** Full
   detail and measurements in §10. A design decision, not a bug: dropping
   `opacity` from the `hero-rise` keyframes in `Hero.css` would make the H1 the
   LCP element again, at the cost of the headline rising without fading. Say the
   word and it is a one-line change.

---

## 8. Recommended further improvements

Ranked by expected value:

1. **Prerender the routes.** Rendering all 10 routes to static HTML at build
   time (a small prerender step, or moving to a framework with SSG) would
   improve FCP and LCP meaningfully and remove the JS dependency for content
   and FAQ schema. This is the highest-value remaining change, and the legal
   pages benefit most — they are pure text and should not need a bundle.
2. **Code-split the below-the-fold sections.** Lighthouse still reports ~33 KiB
   of loaded-but-unexecuted JS. Deferring the lower sections behind
   `React.lazy` would trim TBT further, at the cost of slightly later content
   for crawlers — worth doing only alongside (1).
3. **Serve from a CDN with Brotli** and confirm `Cache-Control: immutable` on
   hashed assets (the headers are in `vercel.json`).
4. **Add a real backend to the access form**, then re-test the full submit path
   including a network-failure case.
5. **Add a Content-Security-Policy.** `X-Content-Type-Options`,
   `Referrer-Policy` and `X-Frame-Options` are set; a CSP is the notable gap.
6. **Consider a self-hosted analytics endpoint** if traffic insight is needed.
   There is none today, which is why the privacy policy can state that no
   cookies are set — adding one means updating that policy.
7. **Re-run Lighthouse against the live domain** once deployed and compare
   against §6a.

---

## 9. Page expansion and reposition — what changed, and how it was verified

### What changed

The site went from 4 routes to 10 and from an *analysis workspace* to an **AI
trading platform**. The content model follows `zephgain-au.com`; the design does
not — every component, stylesheet and token here predates this pass.

- **Navigation.** `NAV_LINKS` in `src/lib/navigation.js` is the single source
  feeding the header and footer. Every `/#section` entry was replaced with a real
  route, and the header CTA now points at `/signup`.
- **Shared components extracted** rather than copy-pasted 3–6 times:
  `PageHero` (inner-page head, now used by every sub-page), `SignUpForm` (one
  implementation, three placements, `tone` selects the dark or light token set),
  `FaqAccordion` (used full-length on `/faq` and capped on the homepage),
  `Placeholder`, and `lib/legal.js` as the single source for the placeholder
  tokens.
- **Homepage copy.** `HowItWorks` went from 4 analysis steps to 3 (open an
  account → fund it → turn trading on), and `Capabilities` gained the three
  confirmed capabilities. Six other sections contained a line asserting Forge
  Capmoor does not trade or hold funds; each was located and rewritten. The
  `Principles` strip's *"The platform proposes. You decide."* was the sharpest
  contradiction — automation you can pause is the honest version of that
  commitment, and it is what the line says now.
- **Legal pages expanded** to the reference's depth, then reconciled with what
  the site actually does. Two honesty constraints are load-bearing and are
  commented in the source: the privacy policy's cookie section states the site
  sets **no** cookies (rather than borrowing the usual "we use cookies and
  similar technologies" wording, which would be false here), and its
  data-collected section lists exactly the four fields the form collects.
- **New:** `HighRiskWarning` band above the footer legal line, and an entity line
  carrying the placeholders.

### Verification actually run

All against the production `vite preview` build, not the dev server.

| Check | Method | Result |
| --- | --- | --- |
| Build | `npm run build` | 97 modules, **zero errors, zero warnings** |
| Routes | Playwright, all 10 | one `<h1>` each, unique title each, correct canonical each, `/thank-you` + 404 no canonical and noindex |
| Chrome anchors | Rendered header + footer `href` values | **zero** `/#…` remain |
| FAQ integrity | Schema questions vs rendered questions | 10 = 10, exact match; **no** FAQPage on any other route |
| Responsive | 10 routes × 9 widths (320–1920), 90 loads | zero horizontal overflow, **zero console errors or warnings** |
| Target size | WCAG 2.5.8 AA, 10 routes × 3 widths | all pass (see note below) |
| Contrast | Lighthouse accessibility (axe `color-contrast`) | **100**, no failing audit |
| Form — unset | Empty, malformed and valid submits | 4 errors + `aria-invalid` + focus moves to the first bad field; format errors name the right field; honest "not connected" message; **no** redirect |
| Form — configured | Build with `VITE_CONTACT_ENDPOINT` set | 2xx → `/thank-you` with payload `{firstName, lastName, email, phone, source}`; **5xx → no redirect**, error shown |
| Form — after soft nav | Client-side navigation to `/thank-you` | title, canonical and robots all update correctly |
| Lighthouse | `/` ×2 and `/signup` | see §6a |

**A note on the target-size result.** The first version of this check reported
90 failures. It was wrong twice: it counted the honeypot as a missing field, and
it measured the 24px circle against the *centre* of neighbouring targets instead
of their nearest edge. Both were bugs in the audit script, not the site — the
corrected check passes everywhere. The same script's contrast calculation also
reported false failures because it discarded alpha when compositing a
semi-transparent background. That is why contrast is reported from Lighthouse's
axe-based audit above, and not from a hand-rolled ratio.

### One deviation from the reference

The reference carries a compact capability table (technology / funding methods /
platform access / execution / instruments / onboarding / support). It is
**omitted** — see §7 item 8 for the reasoning and how to add it back.

---

## 10. Hero network — moved into the hero, and two real defects found

The stage block under the hero was removed and its composition (hub, guide rings,
chips, connectors) now draws against the hero box itself as a background layer.
The user's instruction was *"ye section me jo img usy bd me add krna hero ky"*,
resolved to *"poora stage peeche, neeche wala hata dein"*.

### How it is wired

| Piece | Where |
| --- | --- |
| Geometry — one composition per breakpoint | `src/lib/heroNetwork.js` |
| Connector paths + per-path gradients | `src/components/NetworkSvg.jsx` / `.css` |
| Hub | `src/components/HeroHub.jsx` / `.css` |
| Chips | `src/components/HeroFloatingCard.jsx` / `.css` |
| The background layer itself | `src/components/HeroBackdrop.jsx` / `.css` |
| Deleted | `HeroNetwork.jsx`, `HeroNetwork.css` |

The backdrop stretches to the hero box (`preserveAspectRatio="none"`) because the
canvases are authored to the shape of the hero, not to a fixed ratio. Chips are
positioned as a fraction of that same box, so a connector endpoint and the chip
it points at cannot drift apart — measured drift is 2–4 canvas units across all
six desktop paths. The guide rings deliberately stayed **out** of that SVG:
stretching turns a circle into an ellipse, so they are CSS on the hub instead
(`inset: -(scale − 1) × 50 %`).

### Two defects this surfaced, and the fixes

**1. `ForgeMark` emitted duplicate DOM ids.** The two stroked marks on the
homepage (hero hub, closing CTA) both built `fm-grad-stroke`, so every `url(#…)`
resolved to whichever came first. **Pre-existing, not from this change.** Fixed
with `useId()` plus punctuation stripping in `Icons.jsx`.

**2. `CLS` of 1.0 on every lazily-loaded route.** `<Suspense fallback={null}>`
left `<main>` zero-height while a route chunk was in flight, so the footer
rendered under the header and was shoved a full page down on arrival. Fixed by
gating the footer on a `routeReady` flag. **Lighthouse CLS 1 → 0, performance
73 → 97.** Note the first attempt at this fix set the state flag to `undefined`
by passing React's setter straight through as the callback; the footer then never
rendered at all. Caught by re-running the navigation check, not by reading the
diff.

### Layout work — measured, not guessed

The band under the copy is `(hero height − copy height) / 2`. The hero height is
a share of the viewport; the copy height is not. So a short window shrinks the
band without shrinking the copy, and a canvas position that is safe at 900×1000
is not safe at 1024×768. Three arrangements were tried and two were rejected on
measurement:

| Breakpoint | Arrangement | Why |
| --- | --- | --- |
| Desktop ≥1120 | Chips either side + two above the eyebrow, hub bottom-left | The only canvas with usable side margins (130 units at 1280) |
| Tablet 768–1119 | Four chips in one row, hub in the 200-unit channel between the middle two | Two rows plus a hub needed 230 units of band; only 137 existed at 1024×768 |
| Mobile <768 | Two chip rows, hub centred **below** them | Straddling the hub needed chips 120 units wide and a hub of ~2% width |

Per-breakpoint `.hero` `min-height` floors (54/50/52 rem) put a floor under that
band. `heroNetwork.js` carries the measured clearings in its header comment.

**Rejected first attempts, for the record:** tablet with the hub at `cy 800` put a
117px disc on the copy block; tablet with two rows and the hub at `cy 860` did
the same at 1024×768; desktop side chips at `x 30, w 150` were cut 40 units,
i.e. the entire icon. Those two were measured while the hero still carried its
"See how it works" cue, which was then the lowest thing the copy drew; the cue
has since been removed and the CTA is now that lowest element, but the numbers
above are unchanged — the hub was landing on the copy block either way.

### Verified after the change

| Check | Result |
| --- | --- |
| `npm run build` | zero errors, zero warnings |
| Shape-vs-text collisions, 9 viewports (360–1600 wide, 700–1024 tall) | **zero** hub or chip overlaps with any hero text. Dashed guide rings do pass behind the lead paragraph and the CTA by design |
| Connector endpoint drift | 2/3/3/2/4/4 canvas units — every endpoint lands on its chip edge |
| Horizontal overflow / console errors, 9 viewports | none / none |
| Duplicate DOM ids | none |
| Reduced motion | connectors fully drawn, no animation on lines, hub or chips |
| Route sweep (10 routes) | one `<h1>` each, correct canonical each, `/thank-you` + 404 noindex with no canonical, FAQ schema 10 = 10 on `/faq` only |
| Shell / navigation | footer present on cold load and after soft nav, focus lands on `#main`, risk band intact on all 10 routes |
| Target size (corrected check) | PASS, all routes × 3 widths |
| Lighthouse | see below |

### The hero animation is why the LCP element is the header wordmark

Found while checking Lighthouse, and reported because the claim in §4 that LCP is
the H1 turns out to be **wrong**.

`.hero__eyebrow`, `.hero__title`, `.hero__lead` and `.hero__actions` all use
`animation: hero-rise … both`, which holds them at
`opacity: 0` until their delay elapses (110 ms for the H1). Chrome does not count
an element painted at `opacity: 0` as an LCP candidate, and it never re-considers
the H1 afterwards. Measured directly with a `PerformanceObserver` on `/` at
1280×900:

```
no-preference:  t= 436ms  size=   2992  SPAN.logo__word   ← only candidate
reduce:         t=1092ms  size= 243712  H1.hero__title
```

With the entrance animation active, the page's largest painted element — a
243,712 px² headline — is never the LCP; a 2,992 px² header wordmark is.

**This is pre-existing, not a regression from the hero redesign.** The identical
`hero-rise` values are in the pre-change backup of `Hero.css`.

It is not a user-facing defect: the H1 is fully opaque by ~1.0 s, the animation
is disabled under `prefers-reduced-motion`, and `both` fill guarantees it ends
visible if the animation never runs. It is a *metric* defect — LCP stops
measuring the thing the page is about. Fixing it means dropping `opacity` from
`hero-rise` so the headline rises without fading, which changes the motion
design, so it is left to the user to decide rather than changed unasked.

### Lighthouse after the change (actually run, three times)

Lighthouse 12, default mobile emulation, local `vite preview` build.

| Route | Performance | A11y | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| `/` (run 1) | **79** | **100** | **100** | **100** |
| `/` (run 2) | **89** | — | — | — |
| `/` (run 3) | **84** | — | — | — |
| `/signup` | **79** | **100** | **100** | **100** |

Metrics — `/`: LCP 2.3–2.4 s · TBT 350–760 ms · **CLS 0**.
`/signup`: LCP 2.8 s · TBT 550 ms · **CLS 0**.

**These are lower than the 95–96 recorded earlier in this report, and the reason
is the machine, not the page.** `Get-Process` during the run showed the user's own
Chrome at 5,954 / 2,598 / 1,262 CPU-seconds, VS Code at 2,448 / 1,707, Edge at
745 / 600, and 33 % CPU load. Those processes were **not** killed — they are the
user's browser and editor, and killing them is not reversible. The spread across
three consecutive runs of the *same build* (79 / 84 / 89) is wider than the gap
to the earlier baseline, which is the signature of contention rather than of a
page regression. CLS is 0 on every run, which is the number this session was
actually fixing.

**Caveat:** local preview server, Lighthouse rather than PageSpeed Insights. No
live-domain PageSpeed score is claimed here or anywhere in this report.

### Follow-up: hero overlay and header prominence

A `.hero__overlay` layer now sits between the backdrop and the copy, and the
header is no longer invisible at the top of the page.

**The overlay is sized to the copy, not to the hero** (`width: min(88%, 900px)`,
`height: 62%`, centred). The first attempt was `inset: 0` and it was wrong: a
gradient wide enough to cover a 1048px headline necessarily reaches the side
chips, and because the top chips sit in the same columns it washed those out
too — the accent chip went pale while the dark one stayed solid, which reads as
broken rather than as depth. Sized to the copy, the falloff ends before it
reaches any chip, the hub or either ring. A separate rule for `<768px` widens
and heightens it, because narrow canvases stack the copy taller.

**The header pill is now present at rest** — translucent white fill, hairline
border, soft shadow — and simply firms up on scroll. Previously the bar was
fully transparent until `[data-scrolled]`, which left the wordmark floating
loose over the hero and made the nav read as page content. The wordmark is
bumped to 1.3rem **scoped to `.header__brand`**, not in `Logo.css`, since the
same mark is used in the footer at its original size.

Verified after both: build clean, **zero hub or chip collisions with any hero
text at all nine viewports** (the dashed guide rings do still pass behind the
lead paragraph — that is by design, and the check reports it separately),
navigation and footer checks PASS, Lighthouse accessibility **100** with no
failing audits.

### Follow-up: the "See how it works" cue removed

The scroll cue under the CTA is gone, at the user's request. It was the last
`/#section` anchor in the site, so the page now carries no in-page anchor links
at all; `SECTION_IDS` survives only as the source of the sections' own `id`
attributes.

Removed: the `<p className="hero__note">` block and its now-unused
`SECTION_IDS` / `IconChevronDown` imports in `Hero.jsx`; `.hero__note`,
`.hero__note-link` and their hover/svg rules plus the two matching entries in
the `prefers-reduced-motion` block in `Hero.css`; and the stale constraint in
`heroNetwork.js`'s header comment, which now reads against the CTA.

The removal shifts every measured band position, because the copy got ~40px
shorter and the copy is what the band is measured against. Re-measured on all
nine viewports: **still zero hub or chip collisions with any text**, no
horizontal overflow, no console errors. The only crossings left are dashed
low-opacity guide rings — `ring2×h1` at 1600 and `ring1/2×cta` at 1024 and 1119
— and these are the same class of overlap that was previously accepted against
the note link. Confirmed visually too: a dashed ring behind the solid orange CTA
is not visible, and the one crossing the bottom of the headline at 1600 reads as
depth rather than as interference. `shot.mjs` keeps its `.hero__note` selector
purely so the check reports if the element ever returns.

---

## Deliberate omissions

Per the brief, none of the following were invented, and the design accounts for
their absence:

- No customer counts, revenue, success rates, awards, regulatory licences,
  partnerships, certifications or performance claims
- No testimonials — and no section rebuilt to *look* like testimonials, which is
  the usual way they get smuggled back in
- No partner or customer logos — replaced by a four-point commitments strip
- No social accounts, company address, phone number or registration details
- No statistics section — replaced by a taxonomy of input families, with an
  explicit on-page note explaining why no performance figures are published
- No company history or founding story. The reference carries a five-milestone
  timeline; every one of those milestones would have been invented, so the About
  page makes no claim about the past at all.
