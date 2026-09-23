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
