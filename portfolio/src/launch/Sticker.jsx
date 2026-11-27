import { useRef, useState } from 'react';
import { SCENES, u } from './scale';
import { playSound } from '../utils/sounds';

let topZ = 20; // the last sticker you touch goes on top

const clamp = (v, min, max) => Math.min(Math.max(v, min), max);

// A sticker you can drag anywhere inside the illustration.
// Position is stored in design units, so it stays put when the screen resizes.
// peel: where the bottom-right corner folds, measured as x + y in design px.
// Smaller = bigger peel. peeled: start with the corner already lifted;
// otherwise the sticker lies flat and only peels on hover and while dragging.
export default function Sticker({ src, label, x, y, width, height, peel, peeled = false, layout = 'desktop', delay = 0 }) {
  const { w: SCENE_W, h: SCENE_H } = SCENES[layout];
  const [pos, setPos] = useState({ x, y });
  const [z, setZ] = useState(topZ);
  const [dragging, setDragging] = useState(false);
  const drag = useRef(null);

  const moveTo = (nx, ny) =>
    setPos({ x: clamp(nx, 0, SCENE_W - width), y: clamp(ny, 0, SCENE_H - height) });

  const onPointerDown = (e) => {
    if (e.button !== 0) return;
    const scene = e.currentTarget.closest('[data-scene]');
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      origin: pos,
      scale: scene.getBoundingClientRect().width / SCENE_W, // screen px per design px
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    setZ(++topZ);
    setDragging(true);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    moveTo(d.origin.x + (e.clientX - d.startX) / d.scale, d.origin.y + (e.clientY - d.startY) / d.scale);
  };

  const endDrag = (e) => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    // Only a real move counts as "placing" (not a plain click on the sticker).
    if (d && Math.hypot(e.clientX - d.startX, e.clientY - d.startY) > 3) playSound('stickerPlace');
  };

  // Arrow keys nudge the sticker, so dragging isn't mouse-only.
  const onKeyDown = (e) => {
    const step = e.shiftKey ? 40 : 10;
    const moves = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    const m = moves[e.key];
    if (!m) return;
    e.preventDefault();
    moveTo(pos.x + m[0], pos.y + m[1]);
  };

  return (
    <div
      className="sticker"
      data-dragging={dragging}
      role="button"
      tabIndex={0}
      aria-label={`${label} sticker, drag or use arrow keys to move`}
      style={{
        left: u(pos.x),
        top: u(pos.y),
        width: u(width),
        height: u(height),
        zIndex: z,
        '--w': width,
        '--h': height,
        '--peel': peel,
        '--rest': peeled ? peel : width + height, // width + height = fold outside the sticker = flat
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={onKeyDown}
    >
      <div className="sticker__body" style={{ '--delay': `${delay}ms` }}>
        <img className="sticker__art" src={src} alt="" draggable="false" />
        {/* the folded-over corner: the same art mirrored across the fold line, shown as paper */}
        <div className="sticker__flap">
          <img src={src} alt="" draggable="false" />
        </div>
      </div>
    </div>
  );
}
