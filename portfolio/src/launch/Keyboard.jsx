import { useEffect } from 'react';
import Key, { keyWidth } from './Key';
import { u, TIMING } from './scale';
import { playSound } from './sounds';

// Rows in keyboard coordinates (Figma px). Each key is 71 wide, the space 383,
// a phone key 73. `gap` is the space between keys in that row.
const ROWS = {
  desktop: [
    { x: 141.2, y: 6.75, gap: 3.6, keys: Array(10).fill('green') },
    { x: 106, y: 50, gap: 4.65, keys: ['green', 'pink', ...Array(9).fill('green')] },
    { x: 124.7, y: 93, gap: 7.16, keys: ['pink', 'pink', 'pink', ...Array(7).fill('green')] },
    { x: 90, y: 134, gap: 7.3, keys: ['green', 'green', 'green', 'space', 'green', 'green', 'green'] },
  ],
  phone: [
    { x: 55, y: 80, gap: 11, keys: Array(3).fill('phone') },
    { x: 55, y: 161, gap: 11, keys: Array(3).fill('phone') },
    { x: 55, y: 232, gap: 11, keys: Array(3).fill('phone') },
  ],
};

// Flatten rows into positioned keys, numbered in the order they appear.
// rowStarts = index of the first key in each row (for the row sound).
function buildKeys(rows) {
  const keys = [];
  const rowStarts = [];
  rows.forEach((row) => {
    rowStarts.push(keys.length);
    let x = row.x;
    row.keys.forEach((variant) => {
      keys.push({ variant, x, y: row.y, index: keys.length });
      x += keyWidth(variant) + row.gap;
    });
  });
  return { keys, rowStarts };
}
const LAYOUTS = { desktop: buildKeys(ROWS.desktop), phone: buildKeys(ROWS.phone) };

export const keyCount = (layout) => LAYOUTS[layout].keys.length;

export default function Keyboard({ layout = 'desktop', onLogin }) {
  const { keys, rowStarts } = LAYOUTS[layout];

  // One sound as each row starts rising.
  useEffect(() => {
    const timers = rowStarts.map((i) =>
      setTimeout(() => playSound('keyRow', { volume: 0.7 }), TIMING.keys + i * TIMING.keyStagger)
    );
    return () => timers.forEach(clearTimeout);
  }, [rowStarts]);

  if (layout === 'phone') {
    return (
      <div className="keyboard keyboard--phone" style={{ left: u(20), top: u(613), width: u(352), height: u(654) }}>
        <div className="keyboard__phone-body" style={{ top: u(45), height: u(609) }} />
        <div className="keyboard__hinge" style={{ left: u(66), width: u(220), height: u(68) }} />
        {keys.map((k) => (
          <Key key={k.index} {...k} onPress={onLogin} />
        ))}
        <button type="button" className="sr-only" onClick={onLogin}>
          Log in
        </button>
      </div>
    );
  }

  return (
    <div
      className="keyboard"
      style={{ left: u(125.84), top: u(616.8), width: u(1031), height: u(283) }}
    >
      <svg className="keyboard__body" viewBox="0 0 1031 283" aria-hidden="true">
        {/* deck */}
        <path
          transform="translate(65.16 0.91)"
          d="M0.5 191.541L39.8255 0.5H870.979L909.5 208.5H0.5V191.541Z"
          fill="#EDEFC2"
          stroke="#000"
        />
        {/* frame around the deck */}
        <path
          transform="translate(0.26 0)"
          d="M905.196 0.1637C923.073 -0.388192 943.979 0.596607 961.991 1.03295C971.71 1.26826 985.004 9.1042 988.833 18.5449C995.009 33.7705 997.038 51.0095 1000.95 67.2967C1001.78 73.2849 1003.79 81.365 1005.13 87.386C1007.77 99.5367 1010.57 111.652 1013.53 123.73C1017.42 139.871 1020.56 156.695 1024.08 172.951C1027.98 190.961 1035.65 208.451 1021.31 224.21C1015.67 230.504 1007.76 234.304 999.317 234.776C990.29 235.205 979.307 234.951 970.129 234.991L916.356 235.13L788.016 235.03L458.649 235.035L172.264 235.016H84.2999C65.7323 235.091 46.5917 235.684 28.1624 234.711C13.9191 233.96 0.116166 217.515 0.00175367 203.542C-0.0824818 193.249 2.88605 184.76 4.98814 174.923L17.9488 116.732L31.5922 54.8251C34.511 41.6204 36.5927 21.1064 45.9975 11.1976C60.0319 -3.58888 88.3983 1.05688 107.249 0.408534C113.148 0.280134 119.048 0.222697 124.948 0.236171C118.423 3.36387 110.891 7.48557 107.522 14.2825C101.278 27.2759 100.072 42.7977 96.7381 56.8801C93.5763 70.2341 90.646 83.7338 87.7172 97.1346L76.981 145.742C75.4102 153.148 73.8806 160.483 72.482 167.95C70.0663 180.846 75.8244 192.983 86.9508 199.84C92.0294 202.969 99.1184 203.413 105.026 203.429C131.779 203.503 158.54 203.455 185.296 203.441L329.548 203.416L729.269 203.334L877.048 203.482L912.022 203.491C919.228 203.488 930.071 204.051 936.741 202.418C948.661 199.599 958.989 184.946 957.985 172.852C957.256 164.069 954.53 153.083 952.558 144.386L942.662 100.827L930.451 44.4282C928.895 37.4838 927.563 29.6834 925.654 22.8924C921.84 9.32151 916.455 6.37336 905.196 0.1637Z"
          fill="#EDEFC2"
          stroke="#000"
          strokeWidth="2"
        />
        {/* base */}
        <path
          transform="translate(0 207.81)"
          d="M0.202253 1.55089C5.58146 10.7376 10.4472 19.4874 21.3448 23.0459C31.0782 26.2247 51.7223 24.782 62.7011 24.7258L100.525 24.6265L249.347 24.6426L736.354 24.6182C823.368 24.6077 910.47 25.5374 997.474 24.5385C1003 24.4751 1007.94 23.8523 1012.95 21.2978C1021.47 16.9464 1027.24 8.92765 1030.14 0C1029.98 12.0024 1031.16 35.9983 1029 46.6465C1027.84 51.681 1024.91 56.5766 1021.32 60.257C1016.54 65.175 1008.64 69.6013 1001.73 70.3864C994.331 71.2266 986.594 70.801 979.139 70.801L940.273 70.7704L816.157 70.7261L548.71 70.7636C491.495 70.4254 434.276 70.3999 377.057 70.6871C302.955 71.5513 228.796 70.3729 154.687 70.6684C126.639 70.8676 98.5893 70.8874 70.5408 70.7282C58.2286 70.6928 41.0334 71.6127 29.2108 70.12C21.7003 69.1721 14.5934 66.1806 9.16311 60.8297C5.5864 57.3055 2.77682 52.9187 1.43488 48.0569C-0.860759 39.7405 0.315417 11.8603 0.202253 1.55089Z"
          fill="#F7EBA5"
          stroke="#000"
        />
      </svg>

      {keys.map((k) => (
        <Key key={k.index} {...k} onPress={onLogin} />
      ))}

      {/* The keys are decorative for screen readers; this is their accessible equivalent. */}
      <button type="button" className="sr-only" onClick={onLogin}>
        Log in
      </button>
    </div>
  );
}