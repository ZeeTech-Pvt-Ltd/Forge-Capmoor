/**
 * Trading artwork, drawn rather than photographed.
 *
 * Every visual on this site is hand-built SVG: the Benefits rows, the
 * Technology diagram, the hero network. That is partly weight, partly the
 * brief's rule against using anyone else's assets, and mostly that a drawn
 * chart can be made to carry the argument. A stock photograph of a trading
 * floor says nothing; a candlestick with a leader line running to the note
 * that explains it says what the product does.
 *
 * The palette is the site's own: ink at low opacity for the neutral marks, the
 * accent for the one thing each drawing is about. Nothing here is decorative
 * for its own sake — each piece points at the idea beside it.
 */

const INK = '#0E0E11'
const ACCENT = '#FF4B2B'
// Neutral marks for drawings that sit on a dark band. Ink is invisible there.
const LIGHT = '#ffffff'

/**
 * A candlestick series with one candle called out and its reasoning attached.
 *
 * Bodies are drawn from an open/close pair per candle; the wick is the high
 * and low either side of it. The sequence is hand-set rather than random, so a
 * test run and a screenshot always draw the same chart.
 */
export function ChartArt() {
  // [openY, closeY, highOffset, lowOffset] — y grows downward, so a close
  // above an open means the second number is the smaller one.
  //
  // Twelve candles, not sixteen, and they stop at x 544. The callout panel
  // needs the right of the canvas to itself: with the series running the full
  // width the panel sat on top of the last three candles and the drawing read
  // as a collision rather than as an annotation.
  const candles = [
    [168, 152, 9, 8],
    [152, 158, 8, 10],
    [158, 136, 10, 7],
    [136, 142, 7, 9],
    [142, 120, 9, 8],
    [120, 128, 8, 10],
    [128, 104, 10, 7],
    [104, 112, 7, 9],
    [112, 88, 9, 8],
    [88, 96, 8, 10],
    [96, 72, 10, 8],
    [72, 58, 9, 9],
  ]

  const X0 = 44
  const STEP = 44
  const W = 16
  const CALLOUT = 8 // the ninth candle, the last strong one
  const calloutX = X0 + CALLOUT * STEP + W / 2

  return (
    <svg
      className="chart-art"
      /* Height trimmed to the drawing. The callout panel starts at y 14 and the
         lowest wick ends at 176, so 190 is the tightest box that loses nothing
         — anything taller is margin the panel's own padding already provides. */
      viewBox="0 0 760 190"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Four price levels. Kept very faint so they read as a grid rather than
          as data of their own. */}
      {[60, 104, 148, 192].map((y) => (
        <line
          key={y}
          x1="28"
          y1={y}
          x2="732"
          y2={y}
          stroke={INK}
          strokeOpacity="0.07"
          strokeWidth="1"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
      ))}

      {candles.map(([open, close, hi, lo], i) => {
        const x = X0 + i * STEP
        const top = Math.min(open, close)
        const height = Math.abs(close - open)
        const up = close < open
        const isCalledOut = i === CALLOUT

        return (
          <g key={x}>
            <line
              x1={x + W / 2}
              y1={Math.min(open, close) - hi}
              x2={x + W / 2}
              y2={Math.max(open, close) + lo}
              stroke={isCalledOut ? ACCENT : INK}
              strokeOpacity={isCalledOut ? 0.9 : 0.22}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            <rect
              x={x}
              y={top}
              width={W}
              height={Math.max(height, 3)}
              rx="2.5"
              fill={isCalledOut ? ACCENT : INK}
              fillOpacity={isCalledOut ? 0.14 : up ? 0.14 : 0.24}
              stroke={isCalledOut ? ACCENT : INK}
              strokeOpacity={isCalledOut ? 0.85 : 0.34}
              strokeWidth="1.4"
            />
          </g>
        )
      })}

      {/* The callout: a leader from the highlighted candle to a small panel of
          lines. This is the whole point of the drawing — the bar and the reason
          for it, drawn as one object. */}
      <path
        d={`M ${calloutX} 88 C ${calloutX} 52, 520 40, 580 40`}
        stroke={ACCENT}
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />

      <rect
        x="578"
        y="14"
        width="152"
        height="60"
        rx="12"
        fill={ACCENT}
        fillOpacity="0.06"
        stroke={ACCENT}
        strokeOpacity="0.35"
        strokeWidth="1.3"
      />

      {[30, 44, 58].map((y, i) => (
        <line
          key={y}
          x1="596"
          y1={y}
          x2={i === 2 ? 660 : 704}
          y2={y}
          stroke={ACCENT}
          strokeOpacity={0.55 - i * 0.1}
          strokeWidth="3.4"
          strokeLinecap="round"
        />
      ))}
    </svg>
  )
}

/**
 * The Technology section's artwork: a trading screen with its reasoning beside it.
 *
 * Built as a scene rather than a diagram. The first attempt was three stacked
 * panels joined by a spine — accurate, but it read as a flowchart. This has
 * depth instead: a monitor with a chart on it, the record panels floating in
 * front of it with shadows, and a glow behind the whole thing. The layered
 * overlaps are what make it read as an illustration rather than as a figure.
 *
 * Drawn on the inverted palette because it sits on the one dark band on the
 * page — ink would be invisible there, so the neutral marks are white at low
 * opacity and the accent carries through unchanged.
 *
 * Every gradient id is namespaced with `techart-`. The homepage has other
 * inline SVG on the same page, and an unprefixed `url(#glow)` would resolve to
 * whichever element claimed the id first.
 */
export function ProvenanceArt({ className = 'tech__art' }) {
  // Deterministic, so the drawing is identical on every render and screenshot.
  let seed = 70141
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }
  const candles = []
  let level = 0.55
  for (let i = 0; i < 20; i++) {
    const open = level
    const close = Math.max(0.08, Math.min(0.95, open + (rand() - 0.44) * 0.16))
    candles.push({ open, close, up: close >= open, h: rand() * 0.07, l: rand() * 0.07 })
    level = close
  }

  const SCREEN = { x: 104, y: 92, w: 312, h: 196 }
  const cx = (i) => SCREEN.x + 16 + i * 14.4
  const cy = (v) => SCREEN.y + 22 + (1 - v) * 130

  return (
    <svg className={className} viewBox="0 0 520 470" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="techart-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={ACCENT} stopOpacity="0.3" />
          <stop offset="0.55" stopColor={ACCENT} stopOpacity="0.09" />
          <stop offset="1" stopColor={ACCENT} stopOpacity="0" />
        </radialGradient>

        <linearGradient id="techart-bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2a33" />
          <stop offset="1" stopColor="#121216" />
        </linearGradient>

        <linearGradient id="techart-screen" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#0d0d12" />
          <stop offset="1" stopColor="#1a1a22" />
        </linearGradient>

        <linearGradient id="techart-stand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23232b" />
          <stop offset="1" stopColor="#0e0e12" />
        </linearGradient>

        {/* Soft light under the floating panels — this is what makes them read
            as being in front of the screen rather than printed on it. */}
        <filter id="techart-lift" x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>

      <ellipse cx="260" cy="214" rx="248" ry="206" fill="url(#techart-glow)" />

      {/* The screen. */}
      <rect x="88" y="76" width="344" height="228" rx="18" fill="url(#techart-bezel)" stroke="#fff" strokeOpacity="0.13" strokeWidth="1.3" />
      <rect x={SCREEN.x} y={SCREEN.y} width={SCREEN.w} height={SCREEN.h} rx="10" fill="url(#techart-screen)" />

      {/* Level lines, faint enough to read as a grid rather than as data. */}
      {[0.15, 0.4, 0.65, 0.9].map((v) => (
        <line
          key={v}
          x1={SCREEN.x + 10}
          y1={cy(v)}
          x2={SCREEN.x + SCREEN.w - 10}
          y2={cy(v)}
          stroke="#fff"
          strokeOpacity="0.055"
          strokeWidth="1"
          strokeDasharray="2 7"
          strokeLinecap="round"
        />
      ))}

      {candles.map((c, i) => {
        const top = cy(Math.max(c.open, c.close))
        const height = Math.max(Math.abs(cy(c.close) - cy(c.open)), 1.5)
        return (
          <g key={i}>
            <line
              x1={cx(i)}
              y1={cy(c.close + c.h)}
              x2={cx(i)}
              y2={cy(c.open - c.l)}
              stroke={c.up ? ACCENT : '#fff'}
              strokeOpacity={c.up ? 0.75 : 0.3}
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <rect
              x={cx(i) - 3.6}
              y={top}
              width="7.2"
              height={height}
              rx="1.6"
              fill={c.up ? ACCENT : '#fff'}
              fillOpacity={c.up ? 0.65 : 0.22}
            />
          </g>
        )
      })}

      {/* A volume strip along the bottom of the screen, which is what makes the
          chart read as a trading terminal rather than a line on a box. */}
      {candles.map((c, i) => {
        const h = 6 + (c.up ? 22 : 12) * (0.4 + c.h * 6)
        return (
          <rect
            key={`v${i}`}
            x={cx(i) - 3.6}
            y={SCREEN.y + SCREEN.h - 14 - h}
            width="7.2"
            height={h}
            rx="1.4"
            fill={c.up ? ACCENT : '#fff'}
            fillOpacity={c.up ? 0.26 : 0.1}
          />
        )
      })}

      {/* Monitor stand. */}
      <path d="M232 304 L288 304 L300 336 L220 336 Z" fill="url(#techart-stand)" />
      <rect x="196" y="334" width="128" height="12" rx="6" fill="url(#techart-stand)" stroke="#fff" strokeOpacity="0.1" strokeWidth="1.1" />

      {/* The record panels, in front of the screen. */}
      <g filter="url(#techart-lift)">
        <rect x="16" y="128" width="196" height="126" rx="16" fill="#17171d" fillOpacity="0.96" stroke="#fff" strokeOpacity="0.16" strokeWidth="1.2" />
        <rect x="16" y="128" width="196" height="3" rx="1.5" fill={ACCENT} fillOpacity="0.7" />
        {[0, 1, 2].map((r) => (
          <g key={r}>
            <circle cx="40" cy={166 + r * 32} r="4.5" fill={ACCENT} fillOpacity={0.9 - r * 0.22} />
            <line x1="56" y1={166 + r * 32} x2={r === 1 ? 158 : 184} y2={166 + r * 32} stroke="#fff" strokeOpacity="0.34" strokeWidth="5" strokeLinecap="round" />
            <line x1="56" y1={180 + r * 32} x2={r === 2 ? 128 : 152} y2={180 + r * 32} stroke="#fff" strokeOpacity="0.13" strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}
      </g>

      <g filter="url(#techart-lift)">
        <rect x="336" y="278" width="168" height="86" rx="16" fill="#17171d" fillOpacity="0.96" stroke={ACCENT} strokeOpacity="0.45" strokeWidth="1.3" />
        <rect x="358" y="298" width="30" height="30" rx="9" fill={ACCENT} fillOpacity="0.18" />
        <path d="M366 316 L374 307 L380 312 L388 301" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="400" y1="307" x2="480" y2="307" stroke="#fff" strokeOpacity="0.4" strokeWidth="5" strokeLinecap="round" />
        <line x1="400" y1="322" x2="462" y2="322" stroke="#fff" strokeOpacity="0.16" strokeWidth="5" strokeLinecap="round" />
        <rect x="358" y="338" width="122" height="8" rx="4" fill={ACCENT} fillOpacity="0.3" />
      </g>
    </svg>
  )
}

/**
 * A wide candlestick chart for the homepage hero's background.
 *
 * Separate from `ChartArt` rather than a scaled-up copy of it. That one is a
 * figure with an annotation to read at content width; this one is a backdrop
 * the copy sits on, so it is much wider, has no callout, and carries four
 * times the candles — at hero size a twelve-candle chart reads as a diagram,
 * not as a market.
 *
 * The series is generated from a fixed seed rather than hand-listed, because
 * forty candles written out by hand is forty chances to fat-finger a
 * coordinate. Deterministic, so the drawing is identical on every render and
 * on every screenshot.
 */
export function HeroChartArt() {
  const candles = []
  let price = 0.5
  let seed = 20260923

  // A cheap deterministic PRNG — mulberry32. Not for anything that needs
  // quality randomness; it is here so the chart is the same every time.
  const rand = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  // Built in two passes. The first walks a price and records only its shape;
  // the second maps that shape onto the canvas.
  //
  // One pass was wrong. Starting at 0.62 and drifting upward meant the series
  // never went below about 0.5, so every candle landed in the top half of the
  // 600-unit canvas — measured at y 85..288 of a 720px hero, the top 40%, with
  // the middle and the whole lower half bare. Normalising afterwards makes the
  // drawing use the canvas it is given, whatever shape the walk produces.
  const walk = []
  for (let i = 0; i < 44; i++) {
    const drift = i < 14 ? 0.012 : i < 22 ? -0.009 : 0.015
    price = price + drift + (rand() - 0.5) * 0.05
    walk.push(price)
  }

  const min = Math.min(...walk)
  const max = Math.max(...walk)
  const span = max - min || 1
  // 0.06..0.94 leaves a margin top and bottom so the outer wicks do not touch
  // the canvas edge once the stroke is drawn.
  const place = (v) => 0.06 + ((v - min) / span) * 0.88

  for (let i = 0; i < 44; i++) {
    const open = place(walk[i])
    const close = place(walk[Math.min(i + 1, walk.length - 1)])
    const high = Math.max(open, close) + rand() * 0.03
    const low = Math.min(open, close) - rand() * 0.03
    candles.push({ open, close, high, low, up: close >= open })
  }

  const X0 = 18
  const STEP = 31
  const W = 13
  const TOP = 40
  const SPAN = 520
  const y = (v) => TOP + (1 - v) * SPAN

  return (
    <svg
      className="hero-chart-art"
      viewBox="0 0 1400 600"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      {[0.2, 0.4, 0.6, 0.8].map((level) => (
        <line
          key={level}
          x1="0"
          y1={y(level)}
          x2="1400"
          y2={y(level)}
          stroke={LIGHT}
          strokeOpacity="0.05"
          strokeWidth="1"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />
      ))}

      {candles.map((c, i) => {
        const x = X0 + i * STEP
        const top = y(Math.max(c.open, c.close))
        const height = Math.max(Math.abs(y(c.close) - y(c.open)), 2)
        return (
          <g key={i}>
            <line
              x1={x + W / 2}
              y1={y(c.high)}
              x2={x + W / 2}
              y2={y(c.low)}
              stroke={c.up ? ACCENT : LIGHT}
              strokeOpacity={c.up ? 0.3 : 0.16}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <rect
              x={x}
              y={top}
              width={W}
              height={height}
              rx="2"
              fill={c.up ? ACCENT : LIGHT}
              fillOpacity={c.up ? 0.13 : 0.09}
              stroke={c.up ? ACCENT : LIGHT}
              strokeOpacity={c.up ? 0.34 : 0.18}
              strokeWidth="1.2"
            />
          </g>
        )
      })}
    </svg>
  )
}

/**
 * A ledger of trades with one entry opened out.
 *
 * Portrait rather than landscape, because it sits in a column beside prose.
 * The closed rows read as a list; the open one shows what every row carries —
 * which is the whole argument of the section it sits in. Deliberately not the
 * same drawing as `ReasoningArt`: that one is a graph of sources fanning out
 * from a single trade, this one is a stack where one row has been pulled open.
 */
export function LedgerArt() {
  // Closed rows: a direction chip, a price line, a size bar.
  const closed = [16, 252]

  return (
    <svg viewBox="0 0 300 336" fill="none" aria-hidden="true" focusable="false">
      {closed.map((y) => (
        <g key={y}>
          <rect
            x="10"
            y={y}
            width="280"
            height="68"
            rx="16"
            fill={INK}
            fillOpacity="0.03"
            stroke={INK}
            strokeOpacity="0.13"
            strokeWidth="1.3"
          />
          <rect x="28" y={y + 22} width="24" height="24" rx="7" fill={INK} fillOpacity="0.1" />
          <line x1="70" y1={y + 28} x2="150" y2={y + 28} stroke={INK} strokeOpacity="0.28" strokeWidth="4" strokeLinecap="round" />
          <line x1="70" y1={y + 42} x2="118" y2={y + 42} stroke={INK} strokeOpacity="0.15" strokeWidth="4" strokeLinecap="round" />
          <line x1="206" y1={y + 34} x2="272" y2={y + 34} stroke={INK} strokeOpacity="0.14" strokeWidth="7" strokeLinecap="round" />
        </g>
      ))}

      {/* The opened row. Taller, and lifted out of the stack with an accent
          edge so it reads as the one the drawing is about. */}
      <rect
        x="6"
        y="104"
        width="288"
        height="128"
        rx="18"
        fill={ACCENT}
        fillOpacity="0.05"
        stroke={ACCENT}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <rect x="6" y="104" width="4" height="128" rx="2" fill={ACCENT} />

      <rect x="26" y="124" width="26" height="26" rx="8" fill={ACCENT} fillOpacity="0.16" />
      <circle cx="39" cy="137" r="4" fill={ACCENT} />
      <line x1="70" y1="131" x2="164" y2="131" stroke={INK} strokeOpacity="0.35" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="70" y1="146" x2="122" y2="146" stroke={INK} strokeOpacity="0.16" strokeWidth="4.5" strokeLinecap="round" />

      {/* What the open row carries: three records, stacked. */}
      {[172, 192, 212].map((y, i) => (
        <g key={y}>
          <circle cx="40" cy={y} r="3" fill={ACCENT} fillOpacity="0.75" />
          <line
            x1="54"
            y1={y}
            x2={i === 1 ? 216 : 258}
            y2={y}
            stroke={ACCENT}
            strokeOpacity={0.42 - i * 0.08}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  )
}

/** A setup being acted on: a bar, an arrow, and a filled order behind it. */
export function ActArt() {
  return (
    <svg viewBox="0 0 220 150" fill="none" aria-hidden="true" focusable="false">
      <line x1="18" y1="118" x2="202" y2="118" stroke={INK} strokeOpacity="0.12" strokeWidth="1.4" />
      {[
        [26, 92, 108],
        [54, 74, 100],
        [82, 60, 84],
        [110, 44, 66],
      ].map(([x, top, bottom]) => (
        <g key={x}>
          <line x1={x + 6} y1={top - 9} x2={x + 6} y2={bottom + 9} stroke={INK} strokeOpacity="0.28" strokeWidth="1.5" />
          <rect x={x} y={top} width="13" height={bottom - top} rx="3" fill={INK} fillOpacity="0.16" stroke={INK} strokeOpacity="0.3" strokeWidth="1.3" />
        </g>
      ))}

      <path d="M136 74 L166 74" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 5" />
      <path d="M160 68 L168 74 L160 80" stroke={ACCENT} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="172" y="52" width="34" height="44" rx="8" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeOpacity="0.8" strokeWidth="1.4" />
      <line x1="180" y1="66" x2="198" y2="66" stroke={ACCENT} strokeOpacity="0.85" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="180" y1="76" x2="192" y2="76" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="2.6" strokeLinecap="round" />
      <line x1="180" y1="86" x2="195" y2="86" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}

/** A trade and the record it carries: one mark, three sources hanging off it. */
export function ReasoningArt() {
  return (
    <svg viewBox="0 0 220 150" fill="none" aria-hidden="true" focusable="false">
      <circle cx="46" cy="75" r="17" fill={ACCENT} fillOpacity="0.14" stroke={ACCENT} strokeWidth="1.5" />
      <circle cx="46" cy="75" r="5" fill={ACCENT} />

      {[30, 75, 120].map((y, i) => (
        <g key={y}>
          <path
            d={`M 63 75 C 88 75, 90 ${y}, 112 ${y}`}
            stroke={INK}
            strokeOpacity="0.22"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <rect
            x="112"
            y={y - 13}
            width="92"
            height="26"
            rx="8"
            fill={INK}
            fillOpacity="0.05"
            stroke={INK}
            strokeOpacity="0.16"
            strokeWidth="1.3"
          />
          <line
            x1="124"
            y1={y}
            x2={i === 1 ? 172 : 192}
            y2={y}
            stroke={INK}
            strokeOpacity="0.32"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </g>
      ))}
    </svg>
  )
}

/** A bar being read in place: a crosshair on it, tied down to a note. */
export function ContextArt() {
  const x = 118
  const y = 52

  return (
    <svg viewBox="0 0 220 150" fill="none" aria-hidden="true" focusable="false">
      <line x1="18" y1="124" x2="202" y2="124" stroke={INK} strokeOpacity="0.12" strokeWidth="1.4" />

      {[
        [30, 96, 116],
        [58, 82, 104],
        [86, 68, 90],
        [114, 44, 72],
        [142, 62, 86],
        [170, 50, 74],
      ].map(([bx, top, bottom]) => (
        <rect
          key={bx}
          x={bx}
          y={top}
          width="13"
          height={bottom - top}
          rx="3"
          fill={INK}
          fillOpacity="0.16"
          stroke={INK}
          strokeOpacity="0.3"
          strokeWidth="1.3"
        />
      ))}

      <circle cx={x} cy={y} r="22" stroke={ACCENT} strokeOpacity="0.45" strokeWidth="1.4" strokeDasharray="4 5" />
      <circle cx={x} cy={y} r="4.5" fill={ACCENT} />

      <path d={`M ${x + 22} ${y} L 168 ${y} L 168 96`} stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="146" y="96" width="46" height="20" rx="7" fill={ACCENT} fillOpacity="0.1" stroke={ACCENT} strokeOpacity="0.5" strokeWidth="1.3" />
      <line x1="156" y1="106" x2="182" y2="106" stroke={ACCENT} strokeOpacity="0.7" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  )
}
