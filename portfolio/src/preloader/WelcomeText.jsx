import { useId } from 'react';

// "Welcome!" from the Figma preloader (frame WELCOME, 386 × 128), rebuilt from
// its keyframes. Real text (so the fonts/colours come from the global classes),
// drawn in one SVG so every letter sits exactly where it does in Figma.
//
//  - W, l and ! are revealed by the same round brush strokes Figma masks them with.
//  - e c o m e pop in one after another with Figma's spring; their shadow grows as they land.
//  - every letter has Figma's 2.43px outside outline (see .welcome text in preloader.css).
// Timings live in preloader.css. Plays once when `playing` turns true, then holds.

// Figma rotates every letter by -5°: matrix(cos, -sin, sin, cos, x, y)
const tilt = (x, y) => `matrix(0.9962 -0.0872 0.0872 0.9962 ${x} ${y})`;

// Baselines: Figma trims each text box to cap height, so the baseline sits at
// cap height × font size (Pacifico 0.84, Bricolage 0.66).
const PACIFICO_BASE = 0.84;
const BRICOLAGE_BASE = 0.66;
const BIG = 103.784; // Pacifico W / l
const SMALL = 77.838; // Bricolage letters and the "!"

const ECOME = [
  { ch: 'e', x: 120, y: 58.803 },
  { ch: 'c', x: 186, y: 51.803 },
  { ch: 'o', x: 222, y: 48.803 },
  { ch: 'm', x: 261, y: 44.803 },
  { ch: 'e', x: 324, y: 39.772 },
];

// The brush strokes (Figma "Vector 25 / 26 / 27"), in WELCOME-frame coordinates.
const STROKES = {
  W: {
    at: [32, 23],
    d: 'M117 42.59C106 44.89 80.5 39.85 80.5 19.09C80.5 0.4 89.5-1.91 97 1.09C104.5 4.09 104.15 18.65 101 34.09C97.08 53.29 85.02 72.91 72.06 80.39C53.36 91.19 49.25 38.31 49.56 5.89C39.56 42.13 31.56 87.39 14.56 84.39C4.06 82.54-1.93 34.39 0.56 10.39',
  },
  l: {
    at: [166, 11],
    d: 'M27.34 82.11C25.34 86.61 2.84 100.61 0.34 61.11C-2.51 16.19 13.34-8.39 20.84 2.61C28.34 13.61 23.34 36.11 18.34 48.61L11.84 66.11',
  },
  bang: { at: [374, 16.5], d: 'M0 35.5L7.5 0L29.5 8.5L16 66.5L0 57' },
};
const SHADOW = 9.73; // Figma drop shadow on every letter

// A brush stroke used as a mask, plus its copy one shadow-length lower
// (in Figma the mask carries the drop shadow too).
function StrokeMask({ id, stroke, name, shadowClass }) {
  const [x, y] = stroke.at;
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="-20" y="-20" width="430" height="180">
      <path
        className={`welcome__stroke welcome__stroke--${name}`}
        d={stroke.d}
        transform={`translate(${x} ${y})`}
        pathLength="1"
      />
      <g className={shadowClass}>
        <path
          className={`welcome__stroke welcome__stroke--${name}`}
          d={stroke.d}
          transform={`translate(${x} ${y + (shadowClass ? 0 : SHADOW)})`}
          pathLength="1"
        />
      </g>
    </mask>
  );
}

export default function WelcomeText({ playing = false, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const ids = { W: `${uid}-W`, l: `${uid}-l`, bang: `${uid}-bang` };

  return (
    <svg
      className={`welcome ${playing ? 'is-playing' : ''} ${className}`}
      viewBox="0 0 386 128"
      role="img"
      aria-label="Welcome!"
    >
      <defs>
        <StrokeMask id={ids.W} stroke={STROKES.W} name="W" />
        <StrokeMask id={ids.l} stroke={STROKES.l} name="l" />
        {/* the "!" mask's shadow grows in, so its copy moves instead of sitting 9.73 lower */}
        <StrokeMask id={ids.bang} stroke={STROKES.bang} name="bang" shadowClass="welcome__bangShadow" />
      </defs>

      {/* W: shadow slides down under it while the brush draws */}
      <g mask={`url(#${ids.W})`}>
        <g className="welcome__wShadow">
          <text className="font_pacifico font_mediumBlack" transform={tilt(9.566, 31.447)} y={BIG * PACIFICO_BASE} fontSize={BIG}>
            W
          </text>
        </g>
        <text className="font_pacifico font_pink2" transform={tilt(9.566, 31.447)} y={BIG * PACIFICO_BASE} fontSize={BIG}>
          W
        </text>
      </g>

      {/* e c o m e */}
      {ECOME.map((l, i) => (
        <g key={i} className={`welcome__letter welcome__letter--${i + 1}`}>
          <g className="welcome__letterShadow">
            <text className="font_bricolage font_mediumBlack welcome__bricolage" transform={tilt(l.x, l.y)} y={SMALL * BRICOLAGE_BASE} fontSize={SMALL}>
              {l.ch}
            </text>
          </g>
          <text className="font_bricolage font_teal1 welcome__bricolage" transform={tilt(l.x, l.y)} y={SMALL * BRICOLAGE_BASE} fontSize={SMALL}>
            {l.ch}
          </text>
        </g>
      ))}

      {/* l: drawn by its own brush stroke, shadow already in place */}
      <g mask={`url(#${ids.l})`}>
        <text className="font_pacifico font_mediumBlack" transform={tilt(149, 20.596 + SHADOW)} y={BIG * PACIFICO_BASE} fontSize={BIG}>
          l
        </text>
        <text className="font_pacifico font_pink2" transform={tilt(149, 20.596)} y={BIG * PACIFICO_BASE} fontSize={BIG}>
          l
        </text>
      </g>

      {/* ! appears, then its brush (and shadow) widens */}
      <g mask={`url(#${ids.bang})`} className="welcome__bang">
        <text className="font_pacifico font_mediumBlack" transform={tilt(358, 17.301 + SHADOW)} y={SMALL * PACIFICO_BASE} fontSize={SMALL}>
          !
        </text>
        <text className="font_pacifico font_pink2" transform={tilt(358, 17.301)} y={SMALL * PACIFICO_BASE} fontSize={SMALL}>
          !
        </text>
      </g>
    </svg>
  );
}