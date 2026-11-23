import { useEffect } from 'react';
import Device from './../launch/Device';
import ScreenPopup from './../launch/ScreenPopup';
import Keyboard from './../launch/Keyboard';
import Sticker from './../launch/Sticker';
import { unlockAudio } from './../launch/clickSound';
import { TIMING } from './../launch/scale';
import smiley from './../assets/sticker-smiley.svg';
import headphones from './../assets/sticker-headphones.svg';
import star from './../assets/sticker-star.svg';
import './launch.css';

const STICKERS = [
  { id: 'smiley', label: 'Smiley', src: smiley, x: 1003, y: 51, width: 92, height: 97 },
  { id: 'headphones', label: 'Headphones', src: headphones, x: 151, y: 441, width: 121, height: 121 },
  { id: 'star', label: 'Star', src: star, x: 1020, y: 455, width: 110, height: 119 },
];

export default function LaunchScreen({ onLogin }) {
  useEffect(() => {
    const events = ['pointerdown', 'keydown'];
    events.forEach((ev) => window.addEventListener(ev, unlockAudio, { once: true }));
    return () => events.forEach((ev) => window.removeEventListener(ev, unlockAudio));
  }, []);

  return (
    <div className="launch">
      <div
        className="launch__stage"
        style={{
          '--t-popup': `${TIMING.popup}ms`,
          '--t-keys': `${TIMING.keys}ms`,
          '--t-key-stagger': `${TIMING.keyStagger}ms`,
        }}
      >
        <div className="launch__scene" data-scene>
          <Device>
            <ScreenPopup />
          </Device>
          <Keyboard onLogin={onLogin} />
          {STICKERS.map((s, i) => (
            <Sticker key={s.id} {...s} delay={TIMING.stickers + i * TIMING.stickerStagger} />
          ))}
        </div>
      </div>
    </div>
  );
}
