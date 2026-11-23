import { useState } from 'react';
import { u } from './scale';
import { playClick } from './clickSound';

// Key art from Figma, drawn inline so colors are just props.
const KEY = {
  width: 71,
  height: 58,
  viewBox: '-1 -3 71 58',
  top: 'M11.8997 1.07689C27.4937 0.965051 43.0824 0.975218 58.6711 1.10739C60.4264 5.7976 65.9972 19.8907 66.9069 24.025C46.7642 23.7783 23.4106 23.5535 3.35352 24.1282L6.70886 14.2298L6.76772 13.9665C8.14304 10.6564 10.4388 3.56085 11.8997 1.07689Z',
  front: 'M2.93735 25.1153H67.7353L70.3363 55.4983H0.998185L2.93735 25.1153Z',
};

const SPACE = {
  width: 383,
  height: 60,
  viewBox: '-1 -1.7 383 60',
  top: 'M26.902 1.12857L262.058 1.21129C272.542 1.23158 367.855 0.417366 370.519 1.8564C372.933 4.68974 379.239 21.2012 380.274 25.0881L275.034 25.2025L110.674 25.2379L37.172 25.177C31.0071 25.1734 7.99606 25.4954 3.41332 24.6901C2.98928 21.3235 9.86445 5.14028 11.7848 1.69096C16.0981 1.05417 22.3858 1.16915 26.902 1.12857Z',
  front: 'M2.55249 26.8424L380.498 26.9449C380.8 35.0177 381.684 43.2009 381.669 51.2623C381.663 54.0462 381.591 55.3073 379.561 57.3275C370.857 58.2229 361.736 57.7271 352.985 57.7104L307.069 57.6116L156.691 57.5429C120.012 57.7723 83.3316 57.7864 46.6525 57.585C34.9085 57.559 12.0874 59.0964 1.48069 56.6876C0.159668 47.2178 1.91201 36.424 2.55249 26.8424Z',
};

const COLORS = {
  green: { top: '#EDEFC2', front: '#6B9981' },
  pink: { top: '#E89EAD', front: '#CE5B6E' },
  space: { top: '#EDEFC2', front: '#229D9E' },
};

export const keyWidth = (variant) => (variant === 'space' ? SPACE.width : KEY.width);

export default function Key({ variant = 'green', x, y, index, onPress }) {
  const shape = variant === 'space' ? SPACE : KEY;
  const color = COLORS[variant];
  // A key only reacts once it has finished rising in.
  const [ready, setReady] = useState(false);

  return (
    <div
      className="key"
      data-ready={ready}
      style={{ left: u(x), top: u(y), width: u(shape.width), height: u(shape.height), '--i': index }}
      onPointerEnter={() => ready && playClick(0.6)}
      onClick={() => {
        playClick(1);
        onPress?.();
      }}
      aria-hidden="true"
    >
      <div className="key__rise" onAnimationEnd={() => setReady(true)}>
        <svg className="key__cap" viewBox={shape.viewBox} preserveAspectRatio="none">
          <path d={shape.front} fill={color.front} stroke="#000" strokeWidth="1.5" strokeLinejoin="bevel" />
          <path d={shape.top} fill={color.top} stroke="#000" strokeWidth="1.5" strokeLinejoin="bevel" />
        </svg>
      </div>
    </div>
  );
}
