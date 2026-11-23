import { useEffect } from 'react';
import Device from './../launch/Device';
import ScreenPopup from './../launch/ScreenPopup';
import Keyboard, { keyCount } from './../launch/Keyboard';
import Sticker from './../launch/Sticker';
import { preloadSounds, unlockAudio, playSound } from './../launch/sounds';
import { TIMING, useLayout } from './../launch/scale';
import smiley from './../assets/sticker-smiley.svg';
import headphones from './../assets/sticker-headphones.svg';
import star from './../assets/sticker-star.svg';
import './launch.css';

// Starting spots, in Figma px (same as the design), per layout.
const STICKERS = {
  desktop: [
    { id: 'smiley', label: 'Smiley', src: smiley, x: 1003, y: 51, width: 92, height: 97, peel: 150, peeled: true },
    { id: 'headphones', label: 'Headphones', src: headphones, x: 151, y: 441, width: 121, height: 121, peel: 170 },
    { id: 'star', label: 'Star', src: star, x: 1020, y: 455, width: 110, height: 119, peel: 182 },
  ],
  phone: [
    { id: 'smiley', label: 'Smiley', src: smiley, x: 304.7, y: 94.1, width: 60.3, height: 63.5, peel: 99, peeled: true },
    { id: 'headphones', label: 'Headphones', src: headphones, x: 12, y: 300, width: 69, height: 69, peel: 97 },
  ],
};
// tablet = flip phone without the keypad, stickers a bit bigger
STICKERS.tablet = [
  { id: 'smiley', label: 'Smiley', src: smiley, x: 476, y: 100, width: 78, height: 82, peel: 129, peeled: true },
  { id: 'headphones', label: 'Headphones', src: headphones, x: 22, y: 370, width: 90, height: 90, peel: 126 },
];

export default function LaunchScreen({ onLogin }) {
  const layout = useLayout();

  // Sound can only start after the visitor's first click, tap or key press.
  useEffect(() => {
    preloadSounds();
    const events = ['pointerdown', 'keydown'];
    events.forEach((ev) => window.addEventListener(ev, unlockAudio, { once: true }));
    const swoosh = setTimeout(() => playSound('swoosh'), TIMING.popup);
    return () => {
      events.forEach((ev) => window.removeEventListener(ev, unlockAudio));
      clearTimeout(swoosh);
    };
  }, []);

  // Stickers pop in once the last key has risen (tablet has no keys:
  // they come in right after the screen).
  const hasKeys = layout !== 'tablet';
  const stickersAt = hasKeys ? TIMING.keys + keyCount(layout) * TIMING.keyStagger + 200 : TIMING.keyboard;

  return (
    <div className="launch">
      <div
        className="launch__stage"
        style={{
          '--t-popup': `${TIMING.popup}ms`,
          '--t-keyboard': `${TIMING.keyboard}ms`,
          '--t-keys': `${TIMING.keys}ms`,
          '--t-key-stagger': `${TIMING.keyStagger}ms`,
        }}
      >
        <div className="launch__scene" data-scene key={layout}>
          <Device layout={layout}>
            <ScreenPopup layout={layout} />
          </Device>
          {hasKeys && <Keyboard layout={layout} onLogin={onLogin} />}
          {STICKERS[layout].map((s, i) => (
            <Sticker key={s.id} {...s} layout={layout} delay={stickersAt + i * TIMING.stickerStagger} />
          ))}
        </div>
      </div>
    </div>
  );
}