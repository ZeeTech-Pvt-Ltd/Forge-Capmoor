/**
 * Hero network geometry.
 *
 * One composition per breakpoint, each arranged around the space the headline
 * actually leaves free — they are not the same drawing at three scales.
 *
 * The composition is the hero's own background layer rather than a separate
 * stage below it, so each canvas is authored to the shape of the hero box and
 * `NetworkSvg` stretches to it (`preserveAspectRatio="none"`). That is what
 * keeps every connector endpoint welded to its chip at any hero size: both are
 * placed as a fraction of the same box, so they cannot drift apart.
 *
 * The band each layout must keep clear, measured in that canvas's units at the
 * tightest width in its range:
 *
 *   desktop  1280px  headline is 1048px wide → side margins ~130 units
 *   tablet    900px  headline is  828px wide → side margins ~75 units
 *   mobile    390px  headline is  350px wide → side margins ~20 units
 *
 * Both tablet and mobile therefore put the hub and chips in the band BELOW the
 * copy, and each vertical position below is chosen to clear the primary CTA —
 * the lowest thing the copy draws, now that the "See how it works" note under
 * it has been removed. The hub is included in that: at tablet it was first
 * placed at cy 800, which put a 117px disc squarely on top of the note link.
 *
 * That band is the tight constraint, and it is not a fixed height — it is
 * (hero height − copy height) / 2, and the hero height is a share of the
 * viewport while the copy height is not. So a short window shrinks the band
 * without shrinking the copy. Both non-desktop layouts are built around that:
 * mobile keeps the hub in the 128-unit channel between two chip rows, tablet
 * keeps it in the 200-unit channel between two chips in a single row. Neither
 * spends vertical space on the hub. `.hero`'s per-breakpoint `min-height` is
 * what puts a floor under that band — see Hero.css.
 *
 * `x` and `y` are each element's CENTRE. Connector endpoints are the exact
 * coordinates where a line meets a chip edge — move a chip, move its endpoint
 * with it.
 */

const DESKTOP = {
  name: 'desktop',
  viewBox: '0 0 1440 1000',
  width: 1440,
  height: 1000,
  // Width as a percentage of the canvas, so the hub scales with everything
  // else and its ratio to a chip never changes.
  hub: { cx: 300, cy: 862, pct: 10.4 },
  // Read as a multiple of the hub's own box by `.hero-hub__ring`, so the rings
  // stay circular even though the SVG canvas is stretched. Each step is 0.8×
  // the hub wider and roughly half the opacity of the one inside it, so the
  // outer rings read as a falloff rather than as four separate circles.
  rings: [
    { scale: 2.6, opacity: 0.16 },
    { scale: 3.4, opacity: 0.08 },
    { scale: 4.2, opacity: 0.05 },
    { scale: 5.0, opacity: 0.032 },
  ],
  // `x` of 85 with a half-width of 75 puts a side chip's outer edge 10 units
  // inside the canvas — about 9px at 1280. Earlier these sat at x 30 with a
  // 150 width, which cut ~40 units off, i.e. the whole icon.
  chips: [
    { id: 'signal', label: 'Signals', icon: 'signal', variant: 'dark', viz: 'bars', x: 85, y: 300, w: 150, h: 52 },
    { id: 'risk', label: 'Risk', icon: 'shield', variant: 'light', viz: 'segments', x: 85, y: 640, w: 150, h: 52 },
    { id: 'pattern', label: 'Patterns', icon: 'pattern', variant: 'light', viz: 'spark', x: 1355, y: 300, w: 150, h: 52 },
    { id: 'clarity', label: 'Clarity', icon: 'eye', variant: 'plain', viz: 'steps', x: 1355, y: 640, w: 150, h: 52 },
    { id: 'integrity', label: 'Integrity', icon: 'graph', variant: 'plain', viz: null, x: 480, y: 118, w: 150, h: 52 },
    { id: 'automation', label: 'Automation', icon: 'loop', variant: 'accent', viz: null, x: 960, y: 118, w: 150, h: 52 },
  ],
  paths: [
    { id: 'l1', d: 'M 300 862 C 250 700, 200 460, 162 328', from: [300, 862], to: [162, 326], delay: 240 },
    { id: 'l2', d: 'M 300 862 C 262 800, 205 700, 162 644', from: [300, 862], to: [162, 642], delay: 300 },
    { id: 'l3', d: 'M 300 862 C 500 690, 1120 470, 1278 328', from: [300, 862], to: [1278, 326], delay: 360 },
    { id: 'l4', d: 'M 300 862 C 560 838, 1030 730, 1278 644', from: [300, 862], to: [1278, 642], delay: 420 },
    { id: 'l5', d: 'M 300 862 C 330 700, 420 300, 470 148', from: [300, 862], to: [474, 144], delay: 480 },
    { id: 'l6', d: 'M 300 862 C 420 700, 800 320, 933 148', from: [300, 862], to: [937, 144], delay: 540 },
  ],
}

const TABLET = {
  name: 'tablet',
  viewBox: '0 0 1440 1000',
  width: 1440,
  height: 1000,
  // One band: four chips in a row with the hub standing in the channel between
  // the middle two.
  //
  // The two-row arrangement kept failing at this breakpoint, and always for the
  // same reason — the band under the copy is a share of the hero, which is a
  // share of the viewport, so a short window shrinks the band faster than it
  // shrinks the hub. Two rows plus a 112px hub needed 230 units of that band
  // and at 1024×768 only 137 existed, so the hub landed on the note link. One
  // row costs 52 units total and the hub rides inside it for free. The band
  // then fits the shortest window in the range (see `.hero`'s tablet min-height).
  hub: { cx: 720, cy: 941, pct: 7.5 },
  // Small, and the outer ones run well past the fold — which reads as the
  // drawing continuing rather than as a circle sliced in half.
  rings: [
    { scale: 2.1, opacity: 0.16 },
    { scale: 2.7, opacity: 0.08 },
    { scale: 3.3, opacity: 0.05 },
    { scale: 3.9, opacity: 0.032 },
  ],
  // 160 wide, not 190: that widens the middle channel to 200 units so a hub
  // 108 units across clears the inner chips by ~46 on each side.
  chips: [
    { id: 'signal', label: 'Signals', icon: 'signal', variant: 'dark', viz: 'bars', x: 220, y: 943, w: 160, h: 52 },
    { id: 'pattern', label: 'Patterns', icon: 'pattern', variant: 'light', viz: 'spark', x: 540, y: 943, w: 160, h: 52 },
    { id: 'risk', label: 'Risk', icon: 'shield', variant: 'light', viz: 'segments', x: 900, y: 943, w: 160, h: 52 },
    { id: 'clarity', label: 'Clarity', icon: 'eye', variant: 'plain', viz: 'steps', x: 1220, y: 943, w: 160, h: 52 },
  ],
  // A chain rather than four spokes: the hub links to its two neighbours and
  // those link outward. Spokes to the outer chips would have crossed the inner
  // ones. Chip edges are 300 | 460 … 620 | 820 … 980 | 1140.
  paths: [
    { id: 'l1', d: 'M 666 941 C 652 937, 636 937, 622 941', from: [666, 941], to: [622, 943], delay: 240 },
    { id: 'l2', d: 'M 774 941 C 788 937, 806 937, 818 941', from: [774, 941], to: [818, 943], delay: 300 },
    { id: 'l3', d: 'M 458 943 C 420 935, 360 935, 302 941', from: [458, 943], to: [300, 943], delay: 360 },
    { id: 'l4', d: 'M 982 943 C 1020 935, 1080 935, 1138 941', from: [982, 943], to: [1140, 943], delay: 420 },
  ],
}

const MOBILE = {
  name: 'mobile',
  viewBox: '0 0 400 1000',
  width: 400,
  height: 1000,
  // Below the chips, not between them: two chip rows that straddle the hub need
  // a channel wide enough for it, and at 390px that meant chips 120 units wide
  // and a hub barely 2% of the width. Under them the hub only needs to clear
  // the row above it, which it does without shrinking.
  hub: { cx: 200, cy: 950, pct: 17 },
  rings: [
    { scale: 2.1, opacity: 0.18 },
    { scale: 2.7, opacity: 0.1 },
    { scale: 3.3, opacity: 0.06 },
    { scale: 3.9, opacity: 0.04 },
  ],
  // 120 wide: the widest that still leaves a 100-unit channel between the two
  // columns at x 90 and 310, for `viz: null` chips whose labels are short.
  chips: [
    { id: 'signal', label: 'Signals', icon: 'signal', variant: 'dark', viz: null, x: 90, y: 815, w: 120, h: 52 },
    { id: 'pattern', label: 'Patterns', icon: 'pattern', variant: 'light', viz: null, x: 310, y: 815, w: 120, h: 52 },
    { id: 'risk', label: 'Risk', icon: 'shield', variant: 'light', viz: null, x: 90, y: 900, w: 120, h: 52 },
    { id: 'clarity', label: 'Clarity', icon: 'eye', variant: 'plain', viz: null, x: 310, y: 900, w: 120, h: 52 },
  ],
  // Chip edges are 30…150 and 250…370.
  paths: [
    { id: 'l1', d: 'M 200 950 C 190 920, 172 860, 154 818', from: [200, 950], to: [152, 815], delay: 200 },
    { id: 'l2', d: 'M 200 950 C 210 920, 228 860, 246 818', from: [200, 950], to: [248, 815], delay: 260 },
    { id: 'l3', d: 'M 200 950 C 193 933, 174 916, 154 902', from: [200, 950], to: [152, 900], delay: 320 },
    { id: 'l4', d: 'M 200 950 C 207 933, 226 916, 246 902', from: [200, 950], to: [248, 900], delay: 380 },
  ],
}

export const HERO_LAYOUTS = { desktop: DESKTOP, tablet: TABLET, mobile: MOBILE }
